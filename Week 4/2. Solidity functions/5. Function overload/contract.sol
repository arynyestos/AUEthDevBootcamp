// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {

    // function double(uint num) external pure returns(uint double){
    //     double = 2*num;
    // }

    // function double(uint num1, uint num2) external pure returns(uint double1, uint double2){
    //     double1 = 2*num1;
    //     double2 = 2*num2;
    // }
    
    //Another whay that also works
    function double(uint num) public pure returns(uint twice){
        twice = 2*num;
    }

    function double(uint num1, uint num2) external pure returns(uint, uint){
        return (double(num1), double(num2));
    }
}