pragma solidity ^0.4.0;

contract User {

    address public owner;
    string public name;

    modifier onlyowner {
    	if (msg.sender == owner) {
    		_;
    	}
    }

	function User(string _name) {
		name = _name;
		owner = msg.sender;
	}

	function kill() onlyowner {
		selfdestruct(owner);
	}

	function setOwner(address _owner) onlyowner {
		owner = _owner;
	}
}
