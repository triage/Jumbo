pragma solidity ^0.4.0;
import "./zeppelin/lifecycle/Killable.sol";
import { Schedule } from './Schedule.sol';
import { Authentication } from './Authentication.sol';

contract Individual is Killable {
  mapping(address => string) public name;
  mapping(address => address[]) public schedules;

	function signup(string _name, address authentication) {
		require(sha3(name[msg.sender]) == sha3(""));
		name[msg.sender] = _name;
		if (!Authentication(authentication).signup(msg.sender, "INDIVIDUAL")) {
			revert();
		}
	}

	function getName(address individual) public returns (string) {
		return name[individual];
	}

	function getSchedulesCount() returns (uint) {
		return schedules[msg.sender].length;
	}

	function getSchedule(uint index) returns (address) {
		return schedules[msg.sender][index];
	}

	function scheduleAdded() external {
		//called only from the Schedule
		//tx.origin is the Individual
		schedules[tx.origin].push(msg.sender);
	}

	function scheduleRemoved(address individual) external {
		//called only from the Schedule contract when the studio cancels the class
		for (uint i = 0; i < schedules[individual].length; i++) {
			if (schedules[individual][i] == msg.sender) {
				if (i < schedules[individual].length - 1) {
					schedules[individual][i] = schedules[individual][i+1];
				}
				delete schedules[individual][schedules[individual].length - 1];
				schedules[individual].length--;
				break;
			}
		}
	}
}
