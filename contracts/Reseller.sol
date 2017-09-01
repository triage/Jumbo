pragma solidity ^0.4.0;
import "./zeppelin/lifecycle/Killable.sol";
import { Schedule } from './Schedule.sol';
import { Authentication } from './Authentication.sol';

contract Reseller is Killable {

	enum State {
		Pending, Approved, Rejected
	}

	struct Studio {
		address studio;
		State state;
	}

  	mapping(address => string) public name;
  	mapping(address => Studio[]) private studios;
	address public authentication;

	modifier authenticated() {if (sha3(name[msg.sender]) != sha3("")) _;}

	function setAuthentication(address _authentication) onlyOwner {
		authentication = _authentication;
	}

	function signup(string _name) {
		require(bytes(name[msg.sender]).length == 0);
		assert(authentication != 0x0);
		name[msg.sender] = _name;
		Authentication(authentication).signup(msg.sender, "RESELLER");
	}

	function signedUp() constant returns (bool) {
		return sha3(name[msg.sender]) != sha3("");
	}

	function getName(address reseller) public constant returns (string) {
		return name[reseller];
	}

	function getStudiosCount() authenticated constant returns (uint) {
		return studios[msg.sender].length;
	}

	function getStudio(uint index) authenticated constant returns (address) {
		require(studios[msg.sender].length > 0);
		return studios[msg.sender][index].studio;
	}

	function getStudioState(uint index) authenticated constant returns (uint) {
		require(studios[msg.sender].length > 0);
		return uint(studios[msg.sender][index].state);
	}

	// function spotPurchase(address schedule) payable {
	// 	require(sha3(name[msg.sender]) != sha3(""));
	// 	Schedule(schedule).spotPurchase.value(msg.value)(msg.sender, 0);
	// 	schedules[msg.sender].push(schedule);
	// }

	// function spotCancel(address schedule) {
	// 	require(sha3(name[msg.sender]) != sha3(""));
	// 	Schedule(schedule).spotCancel(msg.sender);

	// 	//called only from the Schedule contract when the studio cancels the class
	// 	for (uint i = 0; i < schedules[msg.sender].length; i++) {
	// 		if (schedules[msg.sender][i] == schedule) {
	// 			if (i < schedules[msg.sender].length - 1) {
	// 				schedules[msg.sender][i] = schedules[msg.sender][i+1];
	// 			}
	// 			delete schedules[msg.sender][schedules[msg.sender].length - 1];
	// 			schedules[msg.sender].length--;
	// 			break;
	// 		}
	// 	}
	// }

	function resellerStateChanged(address studio, uint state) external {
		require(sha3(name[studio]) == sha3(""));
		Studio[] storage resellerStudios = studios[studio];
		//be sure there is a pending request for this studio from the reseller
		bool found = false;
		for (uint i = 0; i < resellerStudios.length; i++) {
			if(resellerStudios[i].studio == studio) {
				found = true;
				resellerStudios[i].state = State(state);
				break;
			}
		}	
	}
}
