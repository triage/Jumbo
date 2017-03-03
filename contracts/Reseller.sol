pragma solidity ^0.4.0;
import {User} from "./User.sol";

contract Reseller is User("name") {
	function Reseller(string _name) {
		name = _name;
		owner = msg.sender;
	}
}
