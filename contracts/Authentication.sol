pragma solidity ^0.4.18;

import './zeppelin/lifecycle/Killable.sol';

contract Authentication is Killable {

    struct User {
        address user;
        string userType;
    }

    address private studio;
    address private individual;
    address private reseller;

    mapping (address => User) private users;

    uint private id; // Stores user id temporarily
    

    modifier trusted() {if (msg.sender == studio || msg.sender == individual || msg.sender == reseller) _;}

    function setStudio(address _studio) public onlyOwner {
        studio = _studio;
    }

    function setIndividual(address _individual) public onlyOwner {
        individual = _individual;
    }

    function setReseller(address _reseller) public onlyOwner {
        reseller = _reseller;
    }

    function login() public view returns (bool) {
        return users[msg.sender].user != 0x0;
    }

    function userType() public view returns (string) {
        return users[msg.sender].userType;
    }

    function signup(address _user, string _userType) trusted external {
        //called from Individual or Studio contract (trusted)
        require(users[_user].user == 0x0);
        users[_user] = User(_user, _userType);
    }
}
