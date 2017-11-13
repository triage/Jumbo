pragma solidity ^0.4.18;
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

	modifier authenticated() {if (keccak256(name[msg.sender]) != keccak256("")) _;}

	function setAuthentication(address _authentication) public onlyOwner {
		authentication = _authentication;
	}

	function signup(string _name) public {
		require(bytes(name[msg.sender]).length == 0);
		assert(authentication != 0x0);
		name[msg.sender] = _name;
		Authentication(authentication).signup(msg.sender, "RESELLER");
	}

	function signedUp() public view returns (bool) {
		return keccak256(name[msg.sender]) != keccak256("");
	}

	function getName(address reseller) public view returns (string) {
		return name[reseller];
	}

	function getStudiosCount() public authenticated view returns (uint) {
		return studios[msg.sender].length;
	}

	function getStudio(uint index) public authenticated view returns (address) {
		require(studios[msg.sender].length > 0);
		return studios[msg.sender][index].studio;
	}

	function getStudioState(uint index) public authenticated view returns (uint) {
		require(studios[msg.sender].length > 0);
		return uint(studios[msg.sender][index].state);
	}

	function spotPurchase(address schedule, address individual) public authenticated payable {
		Schedule(schedule).spotPurchase.value(msg.value)(individual, msg.sender);
	}

	function spotCancel(address schedule, address individual) public authenticated {
		Schedule(schedule).spotCancel(individual, msg.sender);
	}

	function resellerStateChanged(address studio, uint state) external {
		require(keccak256(name[studio]) == keccak256(""));
		Studio[] storage resellerStudios = studios[studio];
		//be sure there is a pending request for this studio from the reseller
		bool found = false;
		for (uint i = 0; i < resellerStudios.length; i++) {
			if (resellerStudios[i].studio == studio) {
				found = true;
				resellerStudios[i].state = State(state);
				break;
			}
		}	
	}
}
