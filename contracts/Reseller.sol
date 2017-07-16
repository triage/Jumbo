pragma solidity ^0.4.0;
import "./zeppelin/lifecycle/Killable.sol";

contract Reseller is Killable {
  string public name;
  
	function Reseller(string _name) {
		name = _name;
		owner = msg.sender;
	}
}
