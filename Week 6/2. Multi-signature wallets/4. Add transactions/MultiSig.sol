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
    mapping (uint => Transaction) public transactions; 

    constructor(address[] memory _owners, uint _required){
        require(_owners.length > 0);
        require(_required > 0);
        require(_required < _owners.length);
        owners = _owners;
        required = _required;
    }
    function addTransaction(address _to, uint _value) public returns(uint txId){
        txId = transactionCount;
        transactions[transactionCount] = Transaction(_to, _value, false);
        transactionCount++;
    }
}
