// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IERC20.sol";

contract Chest {

    function plunder(address[] memory _contractAddresses) external{        
        for(uint8 i; i < _contractAddresses.length; i++){
            IERC20 ERC20Token = IERC20(_contractAddresses[i]);
            uint balance = ERC20Token.balanceOf(address(this));
            ERC20Token.transfer(msg.sender, balance);
        }
    }
}
