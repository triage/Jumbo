pragma solidity ^0.4.0;

contract Class {
	string public name;
	string public description;
	address public studio;
	address public owner;

	modifier onlyowner {
		if (msg.sender == owner) {
			_;
		} else {
			throw;
		}
	}

	function Class(address _studio, string _name, string _description) {
		owner = msg.sender;
		studio = _studio;
		name = _name;
		description = _description;
	}

	function setName(string _name) public onlyowner {
		name = _name;
	}

	function setDescription(string _description) public onlyowner {
		description = _description;
	}
}
