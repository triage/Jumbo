pragma solidity ^0.4.0;
import {Studio} from "./Studio.sol";
import {Class} from "./Class.sol";
import "./zeppelin/lifecycle/Killable.sol";

contract Schedule is Killable {

	string public instructor;
	address public class;

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
		address reseller; //optional
	}

	mapping (uint => Spot) spots;
	uint private nSpotsReseller;
	uint public nSpots;

	mapping(uint => uint) private price;

	modifier withinDeadlineCancellation() { if (now <= dates.cancellation) _; }
	modifier withinDeadlinePurchase() { if (now <= dates.purchase) _; }
	// modifier onlyowner { if (msg.sender == owner) _; }

	event Cancel(string reason);
	event SpotPurchased(uint spotType, address attendee, address reseller, uint index);

	function Schedule(address _class, string _instructor, uint _dateStart, uint _dateEnd, uint _nSpots, uint _nSpotsReseller, uint priceIndividual, uint priceReseller) {
		dates = Dates(_dateStart, _dateEnd, _dateStart - 60 * 60 * 10, _dateStart - 60 * 60);
		class = _class;
		owner = msg.sender;
		instructor = _instructor;
		nSpotsReseller = _nSpotsReseller;
		nSpots = _nSpots;

		price[uint(SpotType.Individual)] = priceIndividual;
		price[uint(SpotType.Reseller)] = priceReseller;

		for(uint i = 0; i < nSpots; i++) {
			spots[i] = Spot(
					SpotType.Available,
					0x0,
					0x0
				);
		}
	}

	function() payable { }

	function complete() onlyOwner {
		//class has completed. Balance should sent to the owner
		selfdestruct(owner);
	}

	function cancel(string reason) onlyOwner {
		//studio needs to cancel this schedule. Refund all spots, notify all attendees of the reason.
		Cancel(reason);

		//process withdrawals
		for(uint spotIndex = 0; spotIndex < nSpots; spotIndex ++) {
			Spot spot = spots[spotIndex];
			if(spot.reseller != 0x0) {
		        if (!spot.reseller.send(0)) {
		            throw;
		        }
			} else {
		        if (!spot.attendee.send(0)) {	
		            throw;
		        }
			}
		}
	}

	function getPrice() public returns (uint) {
		SpotType spotType = spotTypeWithSender(msg.sender);
		return price[uint(spotType)];
	}

	function getPriceWithSender(address sender) private returns (uint) {
		SpotType spotType = spotTypeWithSender(sender);
		return price[uint(spotType)];	
	}

	//reserve a spot for the user
	function spotPurchase(address attendee) payable withinDeadlinePurchase sentRequiredFunds returns (bool) {

		uint price;
		//if msg.sender is reseller
		SpotType spotType = spotTypeWithSender(msg.sender);
		Studio studio = Studio(Class(class).studio());

		var (spot, found, index) = spotFindPurchasable(msg.sender, attendee);
		if (found) {
			spot.spotType = spotType;
			if(spotType == SpotType.Reseller) {
				address reseller = studio.resellerWithSender(msg.sender);
				spot = Spot(spotType, attendee, reseller);
			} else {
				if(Ownable(attendee).owner() != msg.sender) {
					throw;
				}
				spot = Spot(spotType, attendee, 0x0);
			}

			spots[index] = spot;
			
			SpotPurchased(uint(spot.spotType), spot.attendee, spot.reseller, index);
			return;
		}
		throw;
	}

	modifier sentRequiredFunds() {
		SpotType spotType = spotTypeWithSender(msg.sender);
		if(msg.value == price[uint(spotType)]) {
			_;
		}
	}

	function spotTypeWithSender(address sender) private returns (SpotType) {
		Studio studio = Studio(Class(class).studio());
		if(studio.isSenderAuthorizedReseller(sender)) {
			//valid reseller
			return SpotType.Reseller;
		} else {
			//else if is individual
			return SpotType.Individual;
		}
	}

	function spotFindPurchasable(address sender, address attendeeIfReseller) private returns (Spot, bool, uint) {
		SpotType spotType = spotTypeWithSender(sender);

		var (reserved, found, index) = spotFindReserved(sender, attendeeIfReseller);
		if(found) {
			//reseller already secured a spot for attendee
			throw;
		}

		if(nSpotsResellerReserved() == nSpotsReseller) {
			return (Spot(SpotType.Unavailable, 0x0, 0x0), false, 0);
		}

		for(uint spotIndex = 0; spotIndex < nSpots; spotIndex++) {
			Spot spot = spots[spotIndex];
			bool foundEmptySpot = false;
			if(spot.spotType == SpotType.Available) {
				if(spot.attendee == 0x0) {
					return (spot, true, spotIndex);
				}
			}
		}
		return (Spot(SpotType.Unavailable, 0x0, 0x0), false, 0);
	}

	function nSpotsResellerReserved() private returns (uint) {
		uint nSpotsResellerFound = 0;
		for(uint spotIndex = 0; spotIndex < nSpots; spotIndex++) {
			Spot spot = spots[spotIndex];
			if(spot.spotType == SpotType.Reseller) {
				nSpotsResellerFound++;
			}
		}
		return nSpotsResellerFound;
	}

	function spotIsReserved(address attendee) returns (bool) {
		var (spot, found, index) = spotFindReserved(msg.sender, attendee);
		return found;
	}

	function spotFindReserved(address sender, address attendee) private returns (Spot, bool, uint) {
		SpotType spotType = spotTypeWithSender(sender);

		for(uint spotIndex = 0; spotIndex < nSpots; spotIndex++) {
			Spot spot = spots[spotIndex];
			bool foundEmptySpot = false;

			if(spot.spotType == spotType && spot.attendee == attendee) {
				//attendee already bought a spot
				return (spot, true, spotIndex);
			}
		}
		return (Spot(SpotType.Unavailable, 0x0, 0x0), false, 0);
	}

	function spotCancel(address attendee) withinDeadlineCancellation {
		var (spot, found, index) = spotFindReserved(msg.sender, attendee);
		if(!found) {
			//person asked to cancel a spot, yet they don't have a matching spot
			throw;
		}

		uint price = getPriceWithSender(msg.sender);

		if(!msg.sender.send(price)) {
			throw;
		}
		spots[index] = Spot(SpotType.Available, 0x0, 0x0);
	}
}
