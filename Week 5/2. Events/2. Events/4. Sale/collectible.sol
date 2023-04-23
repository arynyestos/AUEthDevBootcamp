// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
    event Deployed(address);
    event Transfer(address, address);
    event ForSale(uint, uint);
    event Purchase(uint, address);
    address owner;
    uint price;

    constructor(){
        emit Deployed(msg.sender);
        owner = msg.sender;
    }

    function transfer(address _recipient) external{
        require(owner == msg.sender, "You are not the owner!");
        emit Transfer(owner, _recipient);
        owner = _recipient;
    }

    function markPrice(uint _price) external{
        require(owner == msg.sender, "You are not the owner!");
        price = _price;
        emit ForSale(_price, block.timestamp);
    }

    function purchase() external payable{
        require(msg.value >= price, "Collectible price higher than bid!");
        require(price > 0);
        price = 0;
        (bool success, ) = owner.call{ value: msg.value }("");
        require(success);        
        owner = msg.sender;
        emit Purchase(msg.value, msg.sender);
    }
}