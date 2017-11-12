pragma solidity ^0.4.18;
import "./zeppelin/lifecycle/Killable.sol";

contract Class is Killable {
	string public name;
	string public description;

	function Class(string _name, string _description) public {
		name = _name;
		description = _description;
	}

	function setName(string _name) public onlyOwner {
		name = _name;
	}

	function setDescription(string _description) public onlyOwner {
		description = _description;
	}
}
