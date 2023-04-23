// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    function filterEven(uint[] memory _numbers) external pure returns(uint[] memory){
        uint elements;
        for(uint i; i < _numbers.length; i++){
            if(_numbers[i] % 2 == 0) elements++;
        }

        uint[] memory filteredEven = new uint[](elements);

        uint filledIndex;
        for(uint i; i < _numbers.length; i++){
            if(_numbers[i] % 2 == 0){
                filteredEven[filledIndex] = _numbers[i];
                filledIndex++;
            }
        }

        return filteredEven;
    }

}