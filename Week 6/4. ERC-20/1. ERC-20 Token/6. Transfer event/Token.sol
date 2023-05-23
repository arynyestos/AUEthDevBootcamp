// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Token {
    uint public totalSupply;
    string public name = "ToniCoin";
    string public symbol = "TCN";
    uint8 public decimals = 18;
    mapping (address => uint) balances;

    event Transfer(address _from, address _to, uint _amount);
    constructor(){
        totalSupply = 1000 * (10 ** decimals);
        balances[msg.sender] = totalSupply;
    }

    function balanceOf(address _holder) external view returns(uint holderBalance){
        holderBalance = balances[_holder];
    }

    function transfer(address _recipient, uint _amount) public returns(bool success) {
        balances[_recipient] += _amount;
        balances[msg.sender] -= _amount;
        emit Transfer(msg.sender, _recipient, _amount);
        success = true;
    }
}