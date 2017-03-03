pragma solidity ^0.4.0;
import {User} from "./User.sol";

contract Studio is User("name") {
	string public contactDetails;
	address[] public resellers;
	address[] public schedules;

	event ScheduleAdded(address indexed schedule);
	event ContactDetailsUpdated(string contactDetails);

	function Studio(string _name) {
		name = _name;
		owner = msg.sender;
	}

	function updateContactDetails(string _contactDetails) onlyowner returns (bool) {
		contactDetails = _contactDetails;
		ContactDetailsUpdated(contactDetails);
		return true;
	}

	function scheduleAdded(address schedule) onlyowner {
		schedules.push(schedule);
		ScheduleAdded(schedule);
	}

	function addReseller(address reseller) onlyowner returns (bool) {
		if(isAuthorizedReseller(reseller)) {
			throw;
		}
		resellers.push(reseller);
		return true;
	}

	function removeReseller(address reseller) onlyowner returns (bool) {
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
			if(User(resellers[resellerIndex]).owner() == sender) {
				reseller = address(resellers[resellerIndex]);
				break;
			}
		}
		return reseller;
	}

	function isSenderAuthorizedReseller(address sender) returns (bool) {
		bool isReseller = false;
		for(uint resellerIndex = 0; resellerIndex < resellers.length; resellerIndex++) {
			if(User(resellers[resellerIndex]).owner() == sender) {
				isReseller = true;
				break;
			}
		}
		return isReseller;
	}
}
