pragma solidity ^0.4.0;
import "./zeppelin/lifecycle/Killable.sol";
import { Schedule } from './Schedule.sol';
import { Authentication } from './Authentication.sol';

contract Individual is Killable {
  	mapping(address => string) public name;
  	mapping(address => address[]) public schedules;
	address public authentication;

	function setAuthentication(address _authentication) onlyOwner {
		authentication = _authentication;
	}

	function signup(string _name) {
		require(sha3(name[msg.sender]) == sha3(""));
		name[msg.sender] = _name;
		Authentication(authentication).signup(msg.sender, "INDIVIDUAL");
	}

	function getName(address individual) public constant returns (string) {
		return name[individual];
	}

	function getSchedulesCount() constant returns (uint) {
		return schedules[msg.sender].length;
	}

	function getSchedule(uint index) constant returns (address) {
		return schedules[msg.sender][index];
	}

	function spotPurchase(address schedule) payable {
		require(sha3(name[msg.sender]) != sha3(""));
		Schedule(schedule).spotPurchase.value(msg.value)(msg.sender);
		schedules[msg.sender].push(schedule);
	}

	function spotCancel(address schedule) {
		require(sha3(name[msg.sender]) != sha3(""));
		Schedule(schedule).spotCancel(msg.sender);

		//called only from the Schedule contract when the studio cancels the class
		for (uint i = 0; i < schedules[msg.sender].length; i++) {
			if (schedules[msg.sender][i] == schedule) {
				if (i < schedules[msg.sender].length - 1) {
					schedules[msg.sender][i] = schedules[msg.sender][i+1];
				}
				delete schedules[msg.sender][schedules[msg.sender].length - 1];
				schedules[msg.sender].length--;
				break;
			}
		}
	}
}
