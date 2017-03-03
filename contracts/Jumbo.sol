pragma solidity ^0.4.0;

contract Jumbo {

	mapping (address => address) private resellers;
	mapping (address => address) private studios;
	mapping (address => address) private individuals;

	function getUser() public returns (address) {
		if(resellers[msg.sender] != 0x0) {
			return resellers[msg.sender];
		} else if(studios[msg.sender] != 0x0) {
			return studios[msg.sender];
		} else if(individuals[msg.sender] != 0x0) {
			return individuals[msg.sender];
		}
		return 0x0;
	}
}
