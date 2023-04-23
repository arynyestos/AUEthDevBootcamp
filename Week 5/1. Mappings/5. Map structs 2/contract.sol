// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
	struct User {
		uint balance;
		bool isActive;
	}

	mapping(address => User) public users;

	function createUser() external{
		require(users[msg.sender].isActive == false, "Cannot create user twice!");
		User storage user = users[msg.sender];
		user.balance = 100;
		user.isActive = true;
	}

	function transfer(address _recipient, uint _amount) external {
		require(users[_recipient].isActive && users[msg.sender].isActive, "Users must be active!");
		require(users[msg.sender].balance >= _amount, "Not enough funds!");
		users[_recipient].balance += _amount;
		users[msg.sender].balance -= _amount;
	}

}