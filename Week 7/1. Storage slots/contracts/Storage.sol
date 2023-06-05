// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "./StorageSlot.sol";
import "hardhat/console.sol";

contract Storage {
    // Posiciones de memoria: 0x0 -> 0xfffff....
    uint x = 97; // Posición 0x0.....0
    uint y = 56; // Posición 0x0.....1 

    //keccak256(key + 0x2)
    mapping(uint => uint) testing; // Posición 0x0.....2

    constructor(){
        //keccak256(21 + 0x2)
        testing[21] = 77;
        //keccak256(44 + 0x2)
        testing[44] = 98;

        // Guardamos en la posición keccak256("Ynyesto") el valor 1234
        StorageSlot.getUint256Slot(keccak256("Ynyesto")).value = 1234;
    }

    function check() external view {
        console.log(StorageSlot.getUint256Slot(keccak256("Ynyesto")).value);
    }
}
