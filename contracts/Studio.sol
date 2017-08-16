pragma solidity ^0.4.0;
import "./zeppelin/lifecycle/Killable.sol";
import { Authentication } from "./Authentication.sol";

contract Studio is Killable {
	mapping(address => string) public name;
	mapping(address => string) public contactDetails;
	mapping(address => address[]) public resellers;
	mapping(address => address[]) public schedules;
	mapping(address => address[]) public classes;

	event ScheduleAdded(address indexed schedule);
	event ScheduleRemoved(address indexed schedule);
	event ClassAdded(address indexed klass);
	event ContactDetailsUpdated(address indexed studio, string contactDetails);

	modifier signedUp() {if (sha3(name[msg.sender]) != sha3("")) _;}

	function signup(string _name, address authentication) {
		require(sha3(name[msg.sender]) == sha3(""));
		name[msg.sender] = _name;
		if (!Authentication(authentication).signup(msg.sender, "STUDIO")) {
			revert();
		}
	}

	function updateContactDetails(string _contactDetails) signedUp public {
		contactDetails[msg.sender] = _contactDetails;
		ContactDetailsUpdated(msg.sender, contactDetails[msg.sender]);
	}

	function classesCount() returns (uint) {
		return classes[msg.sender].length;
	}

	function classAtIndex(uint index) returns (address) {
		return classes[msg.sender][index];
	}

	function classAdded(address klass) {
		classes[msg.sender].push(klass);
		ClassAdded(klass);
	}

	function schedulesCount() returns (uint) {
		return schedules[msg.sender].length;
	}

	function scheduleAtIndex(uint index) returns (address) {
		return schedules[msg.sender][index];
	}

	function scheduleAdded(address schedule) {
		schedules[msg.sender].push(schedule);
		ScheduleAdded(schedule);
	}

	function scheduleRemoved(address schedule) onlyOwner {
		for (uint i = 0; i < schedules[msg.sender].length; i++) {
			if (schedules[msg.sender][i] == schedule) {
				if (i < schedules[msg.sender].length - 1) {
					schedules[msg.sender][i] = schedules[msg.sender][i+1];
				}
				delete schedules[msg.sender][schedules[msg.sender].length - 1];
				schedules[msg.sender].length--;
				ScheduleRemoved(schedule);
				break;
			}
		}
	}

	function addReseller(address reseller) public onlyOwner {
		assert(isAuthorizedReseller(reseller) == false);
		resellers[msg.sender].push(reseller);
	}

	function removeReseller(address reseller) onlyOwner returns (bool) {
		assert(isAuthorizedReseller(reseller));
		for (uint resellerIndex = 0; resellerIndex < resellers[msg.sender].length; resellerIndex++) {
			if (resellers[msg.sender][resellerIndex] == reseller) {
				delete(resellers[msg.sender][resellerIndex]);
				return true;
			}
		}
		return false;
	}

	function isAuthorizedReseller(address reseller) returns (bool) {
		bool isReseller = false;
		for (uint resellerIndex = 0; resellerIndex < resellers[msg.sender].length; resellerIndex++) {
			if (resellers[msg.sender][resellerIndex] == reseller) {
				isReseller = true;
				break;
			}
		}
		return isReseller;
	}

	function resellerWithSender(address sender) returns (address) {
		address reseller = 0x0;
		for (uint resellerIndex = 0; resellerIndex < resellers[msg.sender].length; resellerIndex++) {
			if (Ownable(resellers[msg.sender][resellerIndex]).owner() == sender) {
				reseller = address(resellers[msg.sender][resellerIndex]);
				break;
			}
		}
		return reseller;
	}

	function isSenderAuthorizedReseller(address sender) returns (bool) {
		bool isReseller = false;
		for (uint resellerIndex = 0; resellerIndex < resellers[msg.sender].length; resellerIndex++) {
			if (Ownable(resellers[msg.sender][resellerIndex]).owner() == sender) {
				isReseller = true;
				break;
			}
		}
		return isReseller;
	}
}
