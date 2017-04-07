pragma solidity ^0.4.0;
import "./zeppelin/lifecycle/Killable.sol";

contract Studio is Killable {
	string public name;
	string public contactDetails;
	address[] public resellers;
	address[] public schedules;
	address[] public classes;

	event ScheduleAdded(address indexed schedule);
	event ClassAdded(address indexed class);
	event ContactDetailsUpdated(string contactDetails);

	function Studio(string _name) {
		name = _name;
		owner = msg.sender;
	}

	function updateContactDetails(string _contactDetails) onlyOwner returns (bool) {
		contactDetails = _contactDetails;
		ContactDetailsUpdated(contactDetails);
		return true;
	}

	function classAdded(address class) onlyOwner {
		classes.push(class);
		ClassAdded(class);
	}

	function scheduleAdded(address schedule) onlyOwner {
		schedules.push(schedule);
		ScheduleAdded(schedule);
	}

	function addReseller(address reseller) onlyOwner returns (bool) {
		if(isAuthorizedReseller(reseller)) {
			throw;
		}
		resellers.push(reseller);
		return true;
	}

	function removeReseller(address reseller) onlyOwner returns (bool) {
		if(!isAuthorizedReseller(reseller)) {
			throw;
		}
		for(uint resellerIndex = 0; resellerIndex < resellers.length; resellerIndex++) {
			if(resellers[resellerIndex] == reseller) {
				delete(resellers[resellerIndex]);
				return true;
			}
		}
		return false;
	}

	function isAuthorizedReseller(address reseller) returns (bool) {
		bool isReseller = false;
		for(uint resellerIndex = 0; resellerIndex < resellers.length; resellerIndex++) {
			if(resellers[resellerIndex] == reseller) {
				isReseller = true;
				break;
			}
		}
		return isReseller;
	}

	function resellerWithSender(address sender) returns (address) {
		address reseller = 0x0;
		for(uint resellerIndex = 0; resellerIndex < resellers.length; resellerIndex++) {
			if(Ownable(resellers[resellerIndex]).owner() == sender) {
				reseller = address(resellers[resellerIndex]);
				break;
			}
		}
		return reseller;
	}

	function isSenderAuthorizedReseller(address sender) returns (bool) {
		bool isReseller = false;
		for(uint resellerIndex = 0; resellerIndex < resellers.length; resellerIndex++) {
			if(Ownable(resellers[resellerIndex]).owner() == sender) {
				isReseller = true;
				break;
			}
		}
		return isReseller;
	}
}
