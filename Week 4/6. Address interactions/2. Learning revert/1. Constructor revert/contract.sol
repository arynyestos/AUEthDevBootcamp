// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    constructor() payable {
        require(address(this).balance >= 1 ether, "Not enough funds deposited to deploy the contract.");
    }
}