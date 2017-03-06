pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';

contract Authentication is Killable {

  mapping (address => address) private users;

  uint private id; // Stores user id temporarily

  function login() constant returns (bool) {
    // Check if user exists.
    // If yes, return user.
    // If no, throw.

    if (users[msg.sender] == 0x0)
    {
        throw;
    }

    return (users[msg.sender]);
  }

  function signup(address user) payable returns (bool) {
    // Check if user exists.
    // If yes, return user name.
    // If no, check if name was sent.
    // If yes, create and return user.
    // If no, throw.

    if (user == 0x0)
    {
        throw;
    }

    if (users[msg.sender] == 0x0)
    {
        users[msg.sender] = user;

        return true;
    }

    return false;
  }
}
