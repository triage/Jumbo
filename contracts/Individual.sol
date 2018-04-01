pragma solidity ^0.4.19;
import "./zeppelin/lifecycle/Killable.sol";
import { Schedule } from "./Schedule.sol";
import { Authentication } from "./Authentication.sol";

contract Individual is Killable {
    mapping(address => string) public name;
    mapping(address => address[]) public schedules;
    mapping(address => string) public contactDetails;
    address public authentication;

    event ContactDetailsUpdated(address indexed individual, string contactDetails);

    function setAuthentication(address _authentication) public onlyOwner {
        authentication = _authentication;
    }

    modifier authenticated() {
        require(keccak256(name[msg.sender]) != keccak256(""));
        _;
    }

    function signup(string _name) public {
        require(keccak256(name[msg.sender]) == keccak256(""));
        name[msg.sender] = _name;
        Authentication(authentication).signup(msg.sender, "INDIVIDUAL");
    }

    function getName(address individual) public view returns (string) {
        return name[individual];
    }

    function getContactDetails(address individual) public view returns (string) {
        return contactDetails[individual];
    }

    function updateContactDetails(string _contactDetails) authenticated public {
        contactDetails[msg.sender] = _contactDetails;
        ContactDetailsUpdated(msg.sender, contactDetails[msg.sender]);
    }

    function getSchedulesCount() public view returns (uint) {
        return schedules[msg.sender].length;
    }

    function getSchedule(uint index) public view returns (address) {
        return schedules[msg.sender][index];
    }

    function spotPurchase(address schedule) public authenticated payable {
        Schedule(schedule).spotPurchase.value(msg.value)(msg.sender, 0x0);
        schedules[msg.sender].push(schedule);
    }

    function spotCancel(address schedule) public authenticated {
        Schedule(schedule).spotCancel(msg.sender, 0x0);

        //called only from the Schedule contract when the studio cancels the class
        for (uint i = 0; i < schedules[msg.sender].length; i++) {
            if (schedules[msg.sender][i] == schedule) {
                if (i < schedules[msg.sender].length - 1) {
                    schedules[msg.sender][i] = schedules[msg.sender][i+1];
                }
                delete schedules[msg.sender][schedules[msg.sender].length - 1];
                schedules[msg.sender].length--;
                break;
            }
        }
    }
}
