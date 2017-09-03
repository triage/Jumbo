pragma solidity ^0.4.0;
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

	modifier withinDeadlineCancellation() {if (block.timestamp <= dates.cancellation) _;}
	modifier withinDeadlinePurchase() {if (block.timestamp <= dates.purchase) _; }

	event Cancel(string reason);
	event SpotPurchased(uint spotType, address attendee, address reseller, uint index);
	event SpotCancelled(uint spotType, address attendee, address reseller);

	function Schedule(address _class, string _instructor, uint _dateStart, uint _dateEnd, uint _nSpots, uint _nSpotsReseller, uint priceIndividual, uint priceReseller) {		
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

	function complete() onlyOwner {
		//class has completed. 
		selfdestruct(owner);
		//todo: don't do this http://solidity.readthedocs.io/en/latest/frequently-asked-questions.html#are-mappings-iterable
	}

	function cancel(string reason) onlyOwner {
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

	function getPriceWithUserType(string spotType) public constant returns (uint) {
		//candidate for onlyOwner
		if (sha3(spotType) == sha3("INDIVIDUAL")) {
			return price[uint(SpotType.Individual)];
		} else if (sha3(spotType) == sha3("RESELLER")) {
			return price[uint(SpotType.Reseller)];
		}
		revert();
	}

	function getNumberOfAttendees() onlyOwner constant returns (uint) {
		uint nSpotsReserved = 0;
		for (uint spotIndex = 0; spotIndex < nSpots; spotIndex++) {
			if (spots[spotIndex].attendee != 0x0) {
				nSpotsReserved ++;
			}
		}
		return nSpotsReserved;
	}

	function getSpotAtIndex(uint index) onlyOwner constant returns (address) {
		return spots[index].attendee;
	}

	function getPrice() public returns (uint) {
		SpotType spotType = spotTypeWithSender(0x123);
		return price[uint(spotType)];
	}

	function getPriceWithSender(address sender) private constant returns (uint) {
		SpotType spotType = spotTypeWithSender(sender);
		return price[uint(spotType)];	
	}

	function spotPurchase(address attendee, address reseller) payable external {
		require(attendee != 0x0);
		//sender is the msg.sender sent to the original calling method
		var (spot, found, index) = spotFindPurchasable(attendee, reseller);
		require(found == true);
		SpotType spotType = this.spotTypeWithSender(reseller != 0x0 ? reseller : attendee);
		//todo: address of reseller
		spot = Spot(spotType, attendee, msg.sender, reseller);
		spots[index] = spot;
		SpotPurchased(uint(spot.spotType), spot.attendee, spot.reseller, index);
	}

	function spotCancel(address attendee, address reseller) withinDeadlineCancellation external {
		var (spot, found, index) = spotFindReserved(attendee);
		require(found == true);
		require(spot.sender == msg.sender);
		uint spotPrice = getPriceWithSender(spot.reseller != 0x0 ? spot.reseller : spot.attendee);
		spots[index] = Spot(SpotType.Available, 0x0, 0x0, 0x0);
		address destination = reseller != 0x0 ? reseller : attendee;
		if (!destination.send(spotPrice)) {
			revert();
		}
		SpotCancelled(uint(spot.spotType), attendee, 0x0);
	}

	modifier sentRequiredFunds() {
		SpotType spotType = spotTypeWithSender(msg.sender);
		if (msg.value == price[uint(spotType)]) {
			_;
		}
	}

	function spotTypeWithSender(address sender) constant returns (SpotType) {
		address studio = Class(klass).owner();
		if (studioContract.isAuthorizedReseller(studio, sender) == true) {
			//valid resellers
			return SpotType.Reseller;
		} else {
			//else if is individual
			return SpotType.Individual;
		}
	}

	function spotFindPurchasable(address attendee, address reseller) private constant returns (Spot, bool, uint) {
		var (, found, ) = spotFindReserved(attendee);
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

	function nSpotsResellerReserved() private constant returns (uint) {
		uint nSpotsResellerFound = 0;
		for (uint spotIndex = 0; spotIndex < nSpots; spotIndex++) {
			Spot storage spot = spots[spotIndex];
			if (spot.spotType == SpotType.Reseller) {
				nSpotsResellerFound++;
			}
		}
		return nSpotsResellerFound;
	}

	function spotIsReserved(address attendee) constant returns (bool) {
		var (, found, ) = spotFindReserved(attendee);
		return found;
	}

	function spotFindReserved(address attendee) private constant returns (Spot, bool, uint) {
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
