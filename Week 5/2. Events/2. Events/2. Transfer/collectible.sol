// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
    event Deployed(address);
    event Transfer(address, address);
    address owner;

    constructor(){
        emit Deployed(msg.sender);
        owner = msg.sender;
    }

    function transfer(address _recipient) external{
        require(owner == msg.sender);
        emit Transfer(owner, _recipient);
        owner = _recipient;
    }
}