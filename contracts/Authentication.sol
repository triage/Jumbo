pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';

contract Authentication is Killable {

  struct User {
		address user;
		string userType;
	} 

  mapping (address => User) private users;

  uint private id; // Stores user id temporarily

  function login(address sender) constant returns (address) {
    assert (users[sender].user != 0x0);
    return users[sender].user;
  }

  function userType(address sender) constant returns (string) {
    assert(users[sender].user != 0x0);
    return users[sender].userType;
  }

  function signup(address sender, string userType) external returns (bool) {
    //called from Individual or Studio
    assert (sender != 0x0);
    if (users[sender].user == 0x0) {
        users[sender] = User(sender, userType);
        return true;
    }

    return false;
  }
}
