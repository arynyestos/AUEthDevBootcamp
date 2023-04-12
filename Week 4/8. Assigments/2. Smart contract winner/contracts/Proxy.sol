//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface Contract {
    function attempt() external;
}

contract Proxy {

    function emitWinner(address winnerContract) external {
        Contract(winnerContract).attempt();
    }
}