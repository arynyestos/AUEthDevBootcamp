// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Party {

    uint ticketPrice;
    address[] guestList;
    mapping (address => bool) paid;

    constructor(uint _ticketPrice){
        ticketPrice = _ticketPrice;
    }

    function rsvp() external payable {
        require(msg.value == ticketPrice, "You must send exactly the ticket price!");
        require(!paid[msg.sender], "Cannot RSVP twice!");
        paid[msg.sender] = true;
        guestList.push(msg.sender);
    }

    function payBill(address payable _venueAddress, uint _totalCost) external {
        // Assuming funds in SC > total cost
        (bool success1, ) = _venueAddress.call{value: _totalCost}("");
        require(success1);
        uint remainingBalance = address(this).balance;
        for(uint i = 0; i < guestList.length; i++){
            (bool success2, ) = guestList[i].call{value: remainingBalance/guestList.length}("");
            require(success2);
        }
    }
}