pragma solidity ^0.4.0;
import "./zeppelin/lifecycle/Killable.sol";

contract Individual is Killable {
  string public name;
  address[] public schedules;

	function Individual(string _name) {
		name = _name;
		owner = msg.sender;
	}

	function getName() public returns (string) {
		return name;
	}

	function scheduleAdded() {
		//called only from the Schedule
		//todo: refactor ... should call spotPurchase from Individual, which should be an onlyOwner
		schedules.push(msg.sender);
	}

	function getSchedulesCount() returns (uint) {
		return schedules.length;
	}

	function getSchedule(uint index) returns (address) {
		return schedules[index];
	}

	function scheduleRemoved() onlyOwner {
		//called only from the Schedule. Refactor.
		for(uint i = 0; i < schedules.length; i++) {
			if(schedules[i] == msg.sender) {
				if(i < schedules.length - 1) {
					schedules[i] = schedules[i+1];
				}
				delete schedules[schedules.length - 1];
				schedules.length--;
				break;
			}
		}
	}
}
