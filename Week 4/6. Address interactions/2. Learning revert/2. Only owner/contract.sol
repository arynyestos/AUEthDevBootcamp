// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    
    address deployer;

    constructor() payable {
        require(address(this).balance >= 1 ether, "Not enough funds deposited to deploy the contract.");
        deployer = msg.sender;
    }

    function withdraw() public {
        require(msg.sender == deployer, "Only deployer can withdraw");
        (bool success, ) = address(msg.sender).call{value: address(this).balance}("");
        require(success);
        // A different option:
        // payable(msg.sender).transfer(address(this).balance);

    }
}