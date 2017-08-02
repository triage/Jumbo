pragma solidity ^0.4.0;
import "./zeppelin/lifecycle/Killable.sol";

contract Individual is Killable {
	mapping (address => string) public name;
	mapping (address => address[]) public schedules;
	mapping (address => string) public image;

	function create(string _name, string _image) {
		name[msg.sender] = _name;
		image[msg.sender] = _image;
	}

	function login() public returns (bool) {
		return bytes(name[msg.sender]).length > 0;
	}

	function getName(address addr) public returns (string) {
		return name[addr];
	}

	function setName(string _name) public {
		name[msg.sender] = _name;
	}

	function getSchedules() public returns (address[]) {
		return schedules[msg.sender];
	}

	function addSchedule(address schedule) public {
		schedules[msg.sender].push(schedule);
	}

	function removeSchedule(address schedule) public {
		//find it
		for(uint i = 0; i < schedules[msg.sender].length; i++) {
			address found = schedules[msg.sender][i];
			if (found == schedule) {
				for (uint j = i; j < schedules[msg.sender].length - 1; j++) {
					schedules[msg.sender][j] = schedules[msg.sender][j+1];
				}
				delete schedules[msg.sender][schedules[msg.sender].length - 1];
				schedules[msg.sender].length--;
				break;
			}
		}
	}

	function getImage(address addr) public returns (string) {
		return image[addr];
	}

	function setImage(string url) public {
		image[msg.sender] = url;
	}
}
