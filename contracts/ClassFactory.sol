pragma solidity ^0.4.18;
import { Class } from "./Class.sol";

library ClassFactory {
    function create(address sender, string name, string description) public returns (address) {
        Class class = new Class(name, description);
        class.transferOwnership(sender);
        assert(class.owner() == sender);
        return class;
    }
}