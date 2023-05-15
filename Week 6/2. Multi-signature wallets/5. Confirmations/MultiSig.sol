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
    uint public transactionCount;
    mapping (uint => Transaction) public transactions;
    mapping (uint => mapping(address => bool)) public confirmations;

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
