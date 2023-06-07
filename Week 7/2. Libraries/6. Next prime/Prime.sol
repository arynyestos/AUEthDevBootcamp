// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library Prime {
    function dividesEvenly(uint _num1, uint _num2) public pure returns (bool){
        return (_num1 % _num2 == 0);
    }
    function isPrime(uint _number) public pure returns (bool) {
        if(_number == 2 || _number == 3 || _number == 5 || _number == 7) return true;
        if(dividesEvenly(_number, 2)) return false;
        if(dividesEvenly(_number, 3)) return false;
        if(dividesEvenly(_number, 5)) return false;
        if(dividesEvenly(_number, 7)) return false;
        else return true;
    }
}