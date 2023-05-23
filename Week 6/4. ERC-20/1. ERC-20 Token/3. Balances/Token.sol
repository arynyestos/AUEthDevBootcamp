// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Token {
    uint public totalSupply;
    string public name = "ToniCoin";
    string public symbol = "TCN";
    uint8 public decimals = 18;
    mapping (address => uint) balances;

    function balanceOf(address _holder) external view returns(uint holderBalance){
        holderBalance = balances[_holder];
    }
}