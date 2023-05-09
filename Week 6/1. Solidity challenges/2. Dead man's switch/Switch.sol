// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Switch {

    address recipient;
    address owner;
    uint lastPing;
    
    constructor(address _recipient) payable {
        owner = msg.sender;
        recipient = _recipient;
        lastPing = block.timestamp;        
    }

    function withdraw() external {
        require(block.timestamp - lastPing > 52 weeks, "Not dead yet!");
        (bool success, ) = recipient.call{value: address(this).balance}("");
        require(success);
    }

    function ping() external {
        require(msg.sender == owner, "Only owner can reset countdown!");
        lastPing = block.timestamp;        
    }
}