// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Party {

    uint ticketPrice;
    mapping (address => bool) guestList;

    constructor(uint _ticketPrice){
        ticketPrice = _ticketPrice;
    }

    function rsvp() external payable {
        require(msg.value == ticketPrice, "You must send exactly the ticket price!");
        require(guestList[msg.sender] == false, "Cannot RSVP twice!");
        guestList[msg.sender] = true;
    }

}