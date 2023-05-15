// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {
    address[] public owners;
    uint public required;
    struct Transaction{
        address destination;
        uint value;
        bool executed;
    }
    uint public transactionCount; //method 1
    mapping (uint => Transaction) public transactions; //method 1
    // Transaction[] unconfirmedTransactions; //method 2

    constructor(address[] memory _owners, uint _required){
        require(_owners.length > 0);
        require(_required > 0);
        require(_required < _owners.length);
        owners = _owners;
        required = _required;
    }

    // function transactionCount() public view returns(uint){ //method 2
    //     return unconfirmedTransactions.length;
    // }
}
