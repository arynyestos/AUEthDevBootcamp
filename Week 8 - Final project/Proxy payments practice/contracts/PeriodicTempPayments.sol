// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "hardhat/console.sol";

contract PeriodicTempPayments is Initializable {
    
    mapping(address => string) private workersCities;
    address[] private workerAddresses;
    uint public tempSevilla;
    uint public tempMadrid;
    uint public priceETH;
    uint public paymentInterval;
    uint public lastPaymentTime;
    bool private isRunning;

    function initialize(uint _tempSevilla, uint _tempMadrid, uint _paymentInterval) public initializer {
        tempSevilla = _tempSevilla;
        tempMadrid = _tempMadrid;
        priceETH = 2000 * 10 ** 18;
        paymentInterval = _paymentInterval;
        lastPaymentTime = block.timestamp;
    }

    function registerWorker(address workerAddress, string memory city) public {
        workerAddresses.push(workerAddress);
        workersCities[workerAddress] = city;
    }

    function payWorkers() public {

    require(block.timestamp >= lastPaymentTime + paymentInterval, "Payment interval not reached yet");

        for (uint i = 0; i < workerAddresses.length; i++) {
            address workerAddress = workerAddresses[i];
            uint paymentAmount = calculatePayment(workerAddress);
            payable(workerAddress).transfer(paymentAmount);
            console.log(paymentAmount);
            console.log("WEI payed to worker number");
            console.log(i+1);
        }

        lastPaymentTime = block.timestamp;
    }

    function calculatePayment(address workerAddress) private view returns (uint) {
        uint wageFactor = 10 ** 18;
        uint baseTemperature = 29315;
        uint temp;
        uint baseSalaryUSD = 80;
        uint exchangeRateETHUSD = 2000;

        bytes32 sevillaHash = keccak256(bytes("Sevilla"));
        bytes32 madridHash = keccak256(bytes("Madrid"));
        bytes32 workerCityHash = keccak256(bytes(workersCities[workerAddress]));

        if (workerCityHash == sevillaHash) {
            temp = tempSevilla;
        } else if (workerCityHash == madridHash) {
            temp = tempMadrid;
        }

        if (temp > baseTemperature) {
            wageFactor += (temp - baseTemperature) * 10 ** 18 / 15000; // 15000 so that wage is 20% higher at 50ºC
        }

        return (wageFactor * baseSalaryUSD) / exchangeRateETHUSD;
    }

    receive() external payable {}

}