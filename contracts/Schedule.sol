pragma solidity ^0.4.18;
import { Studio } from "./Studio.sol";
import { Class } from "./Class.sol";
import { Individual } from "./Individual.sol";
import "./zeppelin/lifecycle/Killable.sol";

contract Schedule is Killable {

    string public instructor;
    address public klass;

    struct Dates {
        uint start;
        uint end;
        uint cancellation;
        uint purchase;
    }

    Dates public dates;

    enum SpotType {
        Available,
        Individual,
        Reseller,
        Unavailable
    }

    struct Spot {
        SpotType spotType;
        address attendee;
        address sender; //address of the contract making the external call to spotPurchase / spotCancel
        address reseller; //optional
    }

    mapping (uint => Spot) spots;
    uint private nSpotsReseller;
    uint public nSpots;

    mapping(uint => uint) private price;
    Studio private studioContract;

    modifier withinDeadlineCancellation() {
        require (block.timestamp <= dates.cancellation);
        _;
    }

    modifier withinDeadlinePurchase() {
        require(block.timestamp <= dates.purchase);
        _;
    }

    event Cancel(string reason);
    event SpotPurchased(uint spotType, address attendee, address reseller, uint index, uint spotsAvailable);
    event SpotCancelled(uint spotType, address attendee, address reseller, uint spotsAvailable);
    event ResellerPriceUpdated(address indexed contractAddress, uint newPrice);

    function Schedule(address _class, string _instructor, uint _dateStart, uint _dateEnd, uint _nSpots, uint _nSpotsReseller, uint priceIndividual, uint priceReseller) public {
        studioContract = Studio(msg.sender);
        dates = Dates(_dateStart, _dateEnd, _dateStart - 60 * 60 * 10, _dateStart - 60 * 60);
        klass = _class;
        owner = msg.sender;
        instructor = _instructor;
        nSpotsReseller = _nSpotsReseller;
        nSpots = _nSpots;

        price[uint(SpotType.Individual)] = priceIndividual;
        price[uint(SpotType.Reseller)] = priceReseller;

        for (uint i = 0; i < nSpots; i++) {
            spots[i] = Spot(
                SpotType.Available,
                0x0,
                0x0,
                0x0
            );
        }
    }

    function spotPurchase(address attendee, address reseller) payable external {
        require(attendee != 0x0);
        //sender is the msg.sender sent to the original calling method
        Spot memory spot;
        bool found;
        uint256 index;
        (spot, found, index) = spotFindPurchasable(attendee, reseller);
        require(found == true);
        SpotType spotType = this.spotTypeWithSender(reseller != 0x0 ? reseller : attendee);
        //todo: address of reseller
        spot = Spot(spotType, attendee, msg.sender, reseller);
        spots[index] = spot;
        SpotPurchased(uint(spot.spotType), spot.attendee, spot.reseller, index, nSpots - getNumberOfAttendees());
    }

    function spotCancel(address attendee, address reseller) withinDeadlineCancellation external {
        Spot memory spot;
        bool found;
        uint256 index;
        (spot, found, index) = spotFindReserved(attendee);
        require(found == true);
        require(spot.sender == msg.sender);
        uint spotPrice = getPriceWithSender(spot.reseller != 0x0 ? spot.reseller : spot.attendee);
        spots[index] = Spot(SpotType.Available, 0x0, 0x0, 0x0);
        address destination = reseller != 0x0 ? reseller : attendee;
        if (!destination.send(spotPrice)) {
            revert();
        }
        SpotCancelled(uint(spot.spotType), attendee, 0x0, nSpots - getNumberOfAttendees());
    }

    function priceResellerUpdate(uint _priceReseller) public {
        price[uint(SpotType.Reseller)] = _priceReseller;
        ResellerPriceUpdated(this, _priceReseller);
    }

    function complete() public onlyOwner {
        //class has completed. 
        selfdestruct(owner);
        //todo: don't do this http://solidity.readthedocs.io/en/latest/frequently-asked-questions.html#are-mappings-iterable
    }

    function cancel(string reason) public onlyOwner {
        //studio needs to cancel this schedule. Refund all spots, notify all attendees of the reason.
        Cancel(reason);

        //process withdrawals
        for (uint spotIndex = 0; spotIndex < nSpots; spotIndex ++) {
            Spot storage spot = spots[spotIndex];
            if (spot.reseller != 0x0) {
                if (!spot.reseller.send(price[uint(SpotType.Reseller)])) {
                    revert();
                }
            } else {
                if (spot.attendee != 0x0 && !spot.attendee.send(price[uint(SpotType.Individual)])) {	
                    revert();
                }
            }
        }
        selfdestruct(owner);
    }

    modifier sentRequiredFunds() {
        SpotType spotType = spotTypeWithSender(msg.sender);
        if (msg.value == price[uint(spotType)]) {
            _;
        }
    }

    function getPriceWithUserType(string spotType) public view returns (uint) {
        //candidate for onlyOwner
        if (keccak256(spotType) == keccak256("INDIVIDUAL")) {
            return price[uint(SpotType.Individual)];
        } else if (keccak256(spotType) == keccak256("RESELLER")) {
            return price[uint(SpotType.Reseller)];
        }
        revert();
    }

    function getPrice() public view returns (uint) {
        SpotType spotType = spotTypeWithSender(msg.sender);
        return price[uint(spotType)];
    }

    function getNumberOfAttendees() public onlyOwner view returns (uint) {
        uint nSpotsReserved = 0;
        for (uint spotIndex = 0; spotIndex < nSpots; spotIndex++) {
            if (spots[spotIndex].attendee != 0x0) {
                nSpotsReserved ++;
            }
        }
        return nSpotsReserved;
    }

    function getSpotAtIndex(uint index) onlyOwner public view returns (address) {
        return spots[index].attendee;
    }

    function spotTypeWithSender(address sender) public view returns (SpotType) {
        address studio = Class(klass).owner();
        if (studioContract.isAuthorizedReseller(studio, sender)) {
            return SpotType.Reseller;
        } else {
            return SpotType.Individual;
        }
    }

    function spotIsReserved(address attendee) public view returns (bool) {
        bool found;
        (, found, ) = spotFindReserved(attendee);
        return found;
    }

    function getPriceWithSender(address sender) private view returns (uint) {
        SpotType spotType = spotTypeWithSender(sender);
        return price[uint(spotType)];	
    }

    function spotFindPurchasable(address attendee, address reseller) private view returns (Spot, bool, uint) {
        bool found;
        (, found, ) = spotFindReserved(attendee);
        require(found == false);

        if (nSpotsResellerReserved() == nSpotsReseller && reseller != 0x0) {
            return (Spot(SpotType.Unavailable, 0x0, 0x0, 0x0), false, 0);
        }

        for (uint spotIndex = 0; spotIndex < nSpots; spotIndex++) {
            Spot storage spot = spots[spotIndex];
            if (spot.spotType == SpotType.Available) {
                if (spot.attendee == 0x0) {
                    return (spot, true, spotIndex);
                }
            }
        }
        return (Spot(SpotType.Unavailable, 0x0, 0x0, 0x0), false, 0);
    }

    function nSpotsResellerReserved() private view returns (uint) {
        uint nSpotsResellerFound = 0;
        for (uint spotIndex = 0; spotIndex < nSpots; spotIndex++) {
            Spot storage spot = spots[spotIndex];
            if (spot.spotType == SpotType.Reseller) {
                nSpotsResellerFound++;
            }
        }
        return nSpotsResellerFound;
    }

    function spotFindReserved(address attendee) private view returns (Spot, bool, uint) {
        for (uint spotIndex = 0; spotIndex < nSpots; spotIndex++) {
            Spot storage spot = spots[spotIndex];
            if (spot.attendee == attendee) {
                //attendee already bought a spot
                return (spot, true, spotIndex);
            }
        }
        return (Spot(SpotType.Unavailable, 0x0, 0x0, 0x0), false, 0);
    }
}
