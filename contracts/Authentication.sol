pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';

contract Authentication is Killable {

  struct User {
		address user;
		string userType;
	} 

  mapping (address => User) private users;

  uint private id; // Stores user id temporarily

  function login() constant returns (address) {
    // Check if user exists.
    // If yes, return user.
    // If no, throw.

    if (users[msg.sender].user == 0x0)
    {
        throw;
    }

    return users[msg.sender].user;
  }

  function userType() constant returns (string) {
    if (users[msg.sender].user == 0x0)
    {
        throw;
    }

    return users[msg.sender].userType;
  }

  function signup(address user, string userType) payable returns (bool) {
    // Check if user exists.
    // If yes, return user name.
    // If no, check if name was sent.
    // If yes, create and return user.
    // If no, throw.

    if (user == 0x0)
    {
        throw;
    }

    if (users[msg.sender].user == 0x0)
    {
        users[msg.sender] = User(user, userType);

        return true;
    }

    return false;
  }
}
