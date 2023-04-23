// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Game3 {
  bool public isWon;
  mapping(address => uint) balances;

  function buy() payable external {
    balances[msg.sender] += msg.value;
  }

  function win(address addr1, address addr2, address addr3) external {
    require(balances[addr3] > 0, 'Address 3 should have funds!');
    require(balances[addr2] > balances[addr1], 'Address 2 should have more than address 1!');
    require(balances[addr1] > balances[addr3], 'Address 1 should have more than address 3!');

    isWon = true;
  }
}