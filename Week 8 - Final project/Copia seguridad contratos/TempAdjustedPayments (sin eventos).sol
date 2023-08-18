// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./GetTempFeel.sol";
import "./GetEthPrice.sol";

contract TempAdjustedPayments is Initializable {
    GetTempFeel private getTempFeelContract;
    GetEthPrice private getEthPriceContract;
    mapping(address => string) private workersCities;
    address[] private workerAddresses;
    uint private baseTemperature;
    // uint baseSalaryGWEI;
    uint private baseWageUSD;
    uint public exchangeRateETHUSD;
    uint public lastExecutionTime;
    uint public executionInterval;

    function initialize(uint _executionInterval, address _getTempFeelContract, address _getEthPriceContract) public initializer {
        getTempFeelContract = GetTempFeel(_getTempFeelContract);
        getEthPriceContract = GetEthPrice(_getEthPriceContract);
        baseTemperature = 29315;
        // baseSalaryGWEI = 40000000;  //0.04 ETH/day
        baseWageUSD = 80; 
        lastExecutionTime = 0; 
        executionInterval = _executionInterval * 1 minutes; 
    }

    function registerWorker(address workerAddress, string memory city) public {
        workerAddresses.push(workerAddress);
        workersCities[workerAddress] = city;
    }

    function payWorkers() public {
        require(block.timestamp >= lastExecutionTime + executionInterval, "Function can only be called after the execution interval");

        getEthPriceContract.requestPriceData();

        exchangeRateETHUSD = getEthPriceContract.price(); //returns ETH price in USD times 10^18
        
        for (uint i = 0; i < workerAddresses.length; i++) {
            address workerAddress = workerAddresses[i];
            uint paymentAmount = calculatePayment(workerAddress);
            payable(workerAddress).transfer(paymentAmount);
        }

        lastExecutionTime = block.timestamp; 
    }

    function calculatePayment(address workerAddress) internal returns (uint) {
        // uint wageFactor = 10 ** 9;
        uint wageFactor = 10 ** 18;

        getTempFeelContract.requestTempFeelData(workersCities[workerAddress]);

        uint tempFeel = getTempFeelContract.tempFeel();

        if (tempFeel > baseTemperature) { // only increase wage in hot days
            wageFactor += (tempFeel - baseTemperature) * wageFactor / 15000; // 15000 so that wage is 20% higher at 50ºC
        }

        // return (wageFactor * baseSalaryGWEI); //returns salary in WEI
        return ((wageFactor * baseWageUSD) / exchangeRateETHUSD) * 10 ** 18; //returns salary in WEI
    }

    receive() external payable {}
}