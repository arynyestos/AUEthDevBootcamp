// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {
    address[] public owners;
    uint public required;
    struct Transaction{
        address destination;
        uint value;
        bool executed;
        bytes data;
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

    function addTransaction(address _to, uint _value, bytes memory _data) internal returns(uint txId){
        txId = transactionCount;
        transactions[transactionCount] = Transaction(_to, _value, false, _data);
        transactionCount++;
    }

    function confirmTransaction(uint _txId) public{
        bool isOwner;
        for(uint8 i; i < owners.length; i++){
            if(owners[i] == msg.sender){
                isOwner = true; 
                break;
            }                 
        }
        require(isOwner, "Only owners can confirm.");
        confirmations[_txId][msg.sender] = true;
        if(isConfirmed(_txId)) executeTransaction(_txId);
    }

    function getConfirmationsCount(uint _txId) public view returns(uint confirmationsCount){
        for(uint8 i; i < owners.length; i++){
            if(confirmations[_txId][owners[i]] == true){
                confirmationsCount++;
            }                 
        }

    }

    function submitTransaction(address _to, uint _value, bytes memory _data) external{
        uint txId = addTransaction(_to, _value, _data);
        confirmTransaction(txId);
    }

    receive() external payable{

    }

    function isConfirmed(uint _txId) public view returns(bool confirmation){
        if(getConfirmationsCount(_txId) >= required) confirmation = true;
    }

    function executeTransaction(uint _txId) public{
        require(isConfirmed(_txId), "Transaction must be confirmed to get executed");
        (bool success, ) = transactions[_txId].destination.call{value: transactions[_txId].value}(transactions[_txId].data);
        require(success, "Failed to execute transaction");
        transactions[_txId].executed = true;
    }
}
