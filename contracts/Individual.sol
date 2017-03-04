pragma solidity ^0.4.0;
import "./zeppelin/lifecycle/Killable.sol";

contract Individual is Killable {
  string public name;
  
	function Individual(string _name) {
		name = _name;
		owner = msg.sender;
	}
}
