pragma solidity ^0.4.4;

/*
 * Ownable
 *
 * Base contract with an owner.
 * Provides onlyOwner modifier, which prevents function from running if it is called by anyone other than the owner.
 */
contract Ownable {
  address public owner;

  function Ownable() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    if (msg.sender == owner)
      _;
  }

  event OwnershipChanged(address from, address to);

  function transferOwnership(address newOwner) onlyOwner {
    require(newOwner != 0x0);
    OwnershipChanged(owner, newOwner);
    owner = newOwner;
  }

}
