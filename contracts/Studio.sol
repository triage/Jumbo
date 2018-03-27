pragma solidity ^0.4.18;
import "./zeppelin/lifecycle/Killable.sol";
import { Authentication } from "./Authentication.sol";
import { Class } from "./Class.sol";
import { Schedule } from "./Schedule.sol";
import { Reseller } from "./Reseller.sol";
import { ScheduleFactory } from "./ScheduleFactory.sol";
import { ClassFactory } from "./ClassFactory.sol";
import { Array } from "./Array.sol";

contract Studio is Killable {
    
    mapping(address => string) public name;
    mapping(address => string) public contactDetails;
    mapping(address => address[]) public resellers;
    mapping(address => address[]) public schedules;
    mapping(address => address[]) public classes;
    address public authentication;
    address public reseller;

    event ScheduleAdded(address indexed studio, address indexed klass, address indexed schedule);
    event ScheduleRemoved(address indexed studio, address indexed schedule);
    event ClassAdded(address indexed studio, address indexed klass);
    event ContactDetailsUpdated(address indexed studio, string contactDetails);
    
    modifier authenticated() {
        require(bytes(name[msg.sender]).length > 0);
        _;
    }

    function setAuthentication(address _authentication) public onlyOwner {
        authentication = _authentication;
    }

    function setReseller(address _reseller) public onlyOwner {
        reseller = _reseller;
    }

    function classCreate(string _name, string _description) public {
        address class = ClassFactory.create(msg.sender, _name, _description);
        classes[msg.sender].push(class);
        ClassAdded(msg.sender, address(class));
    }

    function scheduleCreate(address class, string instructor, uint dateStart, uint dateEnd, uint nSpots, uint nSpotsReseller, uint priceIndividual, uint priceReseller) public {
        address schedule = ScheduleFactory.create(msg.sender, class, instructor, dateStart, dateEnd, nSpots, nSpotsReseller, priceIndividual, priceReseller);
        schedules[msg.sender].push(schedule);
        ScheduleAdded(msg.sender, class, schedule);
    }

    function signup(string _name) public {
        require(keccak256(name[msg.sender]) == keccak256(""));
        name[msg.sender] = _name;
        Authentication(authentication).signup(msg.sender, "STUDIO");
    }

    function userExists(address user) public view returns (bool) {
        return bytes(name[user]).length > 0;
    }

    function getName(address studio) public view returns (string) {
        return name[studio];
    }

    function getContactDetails(address studio) public view returns (string) {
        return contactDetails[studio];
    }

    function updateContactDetails(string _contactDetails) authenticated public {
        contactDetails[msg.sender] = _contactDetails;
        ContactDetailsUpdated(msg.sender, contactDetails[msg.sender]);
    }

    function classesCount(address studio) public view returns (uint) {
        return classes[studio].length;
    }

    function classAtIndex(address studio, uint index) public view returns (address) {
        return classes[studio][index];
    }

    function schedulesCount(address studio) public view returns (uint) {
        return schedules[studio].length;
    }

    function scheduleAtIndex(address studio, uint index) public view returns (address) {
        return schedules[studio][index];
    }

    function scheduleRemoved(address schedule) public authenticated {
        for (uint i = 0; i < schedules[msg.sender].length; i++) {
            if (schedules[msg.sender][i] == schedule) {
                if (i < schedules[msg.sender].length - 1) {
                    schedules[msg.sender][i] = schedules[msg.sender][i+1];
                }
                delete schedules[msg.sender][schedules[msg.sender].length - 1];
                schedules[msg.sender].length--;
                ScheduleRemoved(msg.sender, schedule);
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

    function addReseller(address _reseller) public authenticated {
        require(isAuthorizedReseller(msg.sender, _reseller) == false);
        resellers[msg.sender].push(_reseller);
        Reseller(reseller).resellerAdded(msg.sender, _reseller);
    }

    function removeReseller(address _reseller) public authenticated returns (bool) {
        assert(isAuthorizedReseller(msg.sender, _reseller));
        int atIndex;
        atIndex = Array.contains(resellers[msg.sender], _reseller);
        if (atIndex >= 0) {
            delete(resellers[msg.sender][uint(atIndex)]);
            Reseller(reseller).resellerRemoved(msg.sender, _reseller);
        }
        return atIndex != Array.NOT_FOUND();
    }

    function isAuthorizedReseller(address _studio, address _reseller) public view returns (bool) {
        return Array.contains(resellers[_studio], _reseller) != Array.NOT_FOUND();
    }
}
