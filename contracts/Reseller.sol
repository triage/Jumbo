pragma solidity ^0.4.18;
import "./zeppelin/lifecycle/Killable.sol";
import { Schedule } from './Schedule.sol';
import { Authentication } from './Authentication.sol';

contract Reseller is Killable {

	enum State {
		Pending, Approved, Suspended
	}

	struct Studio {
		address studio;
		State state;
	}

	event ContactDetailsUpdated(address indexed studio, string contactDetails);
	event ResellerAdded(address indexed studio, address indexed reseller);
	event ResellerRemoved(address indexed studio, address indexed reseller);

  	mapping(address => string) public name;
  	mapping(address => Studio[]) private studios;
	mapping(address => string) public contactDetails;

	address public authentication;
	address private studio;

	modifier authenticated() {
		require(keccak256(name[msg.sender]) != keccak256(""));
		_;
	}
	modifier onlyStudio() {
		require(msg.sender == studio);
		_;
	}

	function setAuthentication(address _authentication) public onlyOwner {
		authentication = _authentication;
	}

	function setStudio(address _studio) public onlyOwner {
		studio = _studio;
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

	function getContactDetails(address reseller) public view returns (string) {
		return contactDetails[reseller];
	}

	function updateContactDetails(string _contactDetails) authenticated public {
		contactDetails[msg.sender] = _contactDetails;
		ContactDetailsUpdated(msg.sender, contactDetails[msg.sender]);
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

	function resellerAdded(address _studio, address reseller) external onlyStudio {
		studios[reseller].push(Studio(_studio, State.Approved));
		ResellerAdded(_studio, reseller);
	}

	function resellerRemoved(address _studio, address reseller) external onlyStudio {
		for (uint i = 0; i < studios[reseller].length; i++) {
			if (studios[reseller][i].studio == _studio) {
				studios[reseller][i].state = State.Suspended;
				ResellerRemoved(_studio, reseller);
				break;
			}
		}
	}
}
