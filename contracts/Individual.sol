pragma solidity ^0.4.0;
import {User} from "./User.sol";

contract Individual is User("name") {
	function Individual(string _name) {
		name = _name;
		owner = msg.sender;
	}
}
