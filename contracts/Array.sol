pragma solidity ^0.4.18;

library Array {
    function NOT_FOUND() public pure returns (int) {
        return -1;
    }

    function contains(address[] haystack, address needle) public pure returns (int) {
        bool exists = false;
        int atIndex = NOT_FOUND();
        for (uint i = 0; i < haystack.length; i++) {
            if (haystack[i] == needle) {
                exists = true;
                atIndex = int(i);
                break;
            }
        }
        return atIndex;
    }

    function remove(address[] haystack, address needle) public pure returns (address[]) {
        for (uint i = 0; i < haystack.length; i++) {
            if (haystack[i] == needle) {
                if (i < haystack.length - 1) {
                    haystack[i] = haystack[i+1];
                }
                delete haystack[haystack.length - 1];
                break;
            }
        }
        return haystack;
    }
}
