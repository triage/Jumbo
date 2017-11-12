pragma solidity ^0.4.18;
import "./zeppelin/lifecycle/Killable.sol";
import { Authentication } from "./Authentication.sol";
import { Class } from "./Class.sol";
import { Schedule } from "./Schedule.sol";

contract Studio is Killable {
	
	mapping(address => string) public name;
	mapping(address => string) public contactDetails;
	mapping(address => address[]) public resellers;
	mapping(address => address[]) public schedules;
	mapping(address => address[]) public classes;

	event ScheduleAdded(address indexed schedule);
	event ScheduleRemoved(address indexed schedule);
	event ClassAdded(address indexed klass);
	event ContactDetailsUpdated(address indexed studio, string contactDetails);
	modifier authenticated() {if (bytes(name[msg.sender]).length > 0) _;}

	address public authentication;
	function setAuthentication(address _authentication) public onlyOwner {
		authentication = _authentication;
	}

	function classCreate(string _name, string _description) public {
		Class class = new Class(_name, _description);
		class.transferOwnership(msg.sender);
		assert(class.owner() == msg.sender);
		classes[msg.sender].push(class);
	}

	function scheduleCreate(address class, string instructor, uint dateStart, uint dateEnd, uint nSpots, uint nSpotsReseller, uint priceIndividual, uint priceReseller) public {
		require(class != 0x0);
		require(dateStart > 0);
		require(dateEnd > 0);
		require(nSpots > nSpotsReseller);
		require(priceIndividual > 0);
		require(priceReseller > 0);
		
		Schedule schedule = new Schedule(class, instructor, dateStart, dateEnd, nSpots, nSpotsReseller, priceIndividual, priceReseller);
		schedule.transferOwnership(msg.sender);
		assert(schedule.owner() == msg.sender);
		schedules[msg.sender].push(schedule);
	}

	function signup(string _name) public {
		require(keccak256(name[msg.sender]) == keccak256(""));
		name[msg.sender] = _name;
		Authentication(authentication).signup(msg.sender, "STUDIO");
	}

	function userExists(address user) public constant returns (bool) {
		return bytes(name[user]).length > 0;
	}

	function getName(address studio) public constant returns (string) {
		return name[studio];
	}

	function getContactDetails(address studio) public constant returns (string) {
		return contactDetails[studio];
	}

	function updateContactDetails(string _contactDetails) authenticated public {
		contactDetails[msg.sender] = _contactDetails;
		ContactDetailsUpdated(msg.sender, contactDetails[msg.sender]);
	}

	function classesCount() public constant returns (uint) {
		return classes[msg.sender].length;
	}

	function classAtIndex(uint index) public constant returns (address) {
		return classes[msg.sender][index];
	}

	function schedulesCount() public constant returns (uint) {
		return schedules[msg.sender].length;
	}

	function scheduleAtIndex(uint index) public constant returns (address) {
		return schedules[msg.sender][index];
	}

	function scheduleAdded(address schedule) public {
		schedules[msg.sender].push(schedule);
		ScheduleAdded(schedule);
	}

	function scheduleRemoved(address schedule) public authenticated {
		for (uint i = 0; i < schedules[msg.sender].length; i++) {
			if (schedules[msg.sender][i] == schedule) {
				if (i < schedules[msg.sender].length - 1) {
					schedules[msg.sender][i] = schedules[msg.sender][i+1];
				}
				delete schedules[msg.sender][schedules[msg.sender].length - 1];
				schedules[msg.sender].length--;
				ScheduleRemoved(schedule);
				break;
			}
		}
	}

	function resellersCount() authenticated public view returns (uint) {
		return resellers[msg.sender].length;
	}

	function resellerAtIndex(uint index) authenticated public view returns (address) {
		return resellers[msg.sender][index];
	}

	function addReseller(address reseller) public authenticated {
		require(isAuthorizedReseller(msg.sender, reseller) == false);
		resellers[msg.sender].push(reseller);
	}

	function removeReseller(address reseller) public authenticated returns (bool) {
		assert(isAuthorizedReseller(msg.sender, reseller));
		for (uint resellerIndex = 0; resellerIndex < resellers[msg.sender].length; resellerIndex++) {
			if (resellers[msg.sender][resellerIndex] == reseller) {
				delete(resellers[msg.sender][resellerIndex]);
				return true;
			}
		}
		return false;
	}

	function isAuthorizedReseller(address studio, address reseller) public view returns (bool) {
		bool isReseller = false;
		for (uint resellerIndex = 0; resellerIndex < resellers[studio].length; resellerIndex++) {
			if (resellers[studio][resellerIndex] == reseller) {
				isReseller = true;
				break;
			}
		}
		return isReseller;
	}
}
