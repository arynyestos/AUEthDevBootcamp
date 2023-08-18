// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./GetTempFeel.sol";
import "./GetEthPrice.sol";

contract TempAdjustedPaymentsV2 is Initializable {
    GetTempFeel private getTempFeelContract;
    GetEthPrice private getEthPriceContract;
    mapping(address => string) private workersCities;
    address[] private workerAddresses;
    uint16 private baseTemperature;
    uint8 private baseWageUSD;
    uint public exchangeRateETHUSD;
    uint8 private lastWorkerPayedIndex;
    address private owner;
    address private ethPriceContractAddress;
    address private tempFeelContractAddress;
    address private upKeepContractAddress;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }
    
    modifier onlyEthPriceContract() {
        require(msg.sender == ethPriceContractAddress, "Only GetEthPrice contract can call this function");
        _;
    }
    
    modifier onlyTempFeelContract() {
        require(msg.sender == tempFeelContractAddress, "Only GetTempFeel contract can call this function");
        _;
    }
    
    modifier onlyUpKeepContract() {
        require(msg.sender == upKeepContractAddress, "Only GetTempFeel contract can call this function");
        _;
    }

    event PaymentProcessed(address indexed workerAddress, uint paymentAmount);

    function initialize(address _ethPriceContractAddress, address _tempFeelContractAddress) public initializer {
        owner = msg.sender;
        ethPriceContractAddress = _ethPriceContractAddress;
        tempFeelContractAddress = _tempFeelContractAddress;
        getEthPriceContract = GetEthPrice(_ethPriceContractAddress);
        getTempFeelContract = GetTempFeel(_tempFeelContractAddress);
        baseTemperature = 29315;
        baseWageUSD = 80; 
    }

    function registerWorker(address workerAddress, string memory city) external onlyOwner {
        workerAddresses.push(workerAddress);
        workersCities[workerAddress] = city;
    }
    function deregisterWorker(address workerAddress) external onlyOwner {
        bool found = false;
        uint workerIndexToRemove;

        for (uint i = 0; i < workerAddresses.length; i++) {
            if (workerAddresses[i] == workerAddress) {
                found = true;
                workerIndexToRemove = i;
                break;
            }
        }

        require(found, "Worker not found");

        // Remove the worker from the array by swapping with the last element and then reducing the array size
        workerAddresses[workerIndexToRemove] = workerAddresses[workerAddresses.length - 1];
        workerAddresses.pop();

        // Delete the worker's city from the mapping
        delete workersCities[workerAddress];
    }

    function payWorkersAuto() external onlyUpKeepContract {

        lastWorkerPayedIndex = 0;        
        getEthPriceContract.requestPriceData();        
    }
    
    function payWorkersMan() external onlyOwner {

        lastWorkerPayedIndex = 0;        
        getEthPriceContract.requestPriceData();        
    }

    function callbackEthPrice(uint256 _price) external onlyEthPriceContract {
        exchangeRateETHUSD = _price;
        
        for (uint i = 0; i < workerAddresses.length; i++) {
            address workerAddress = workerAddresses[i];
            getTempFeelContract.requestTempFeelData(workersCities[workerAddress]);
        }
    }

    function callbackTempFeel(uint _tempFeel) external onlyTempFeelContract {
        uint wageFactor = 10 ** 18;

        if (_tempFeel > baseTemperature) { // only increase wage in hot days
            wageFactor += (_tempFeel - baseTemperature) * wageFactor / 15000; // 15000 so that wage is 20% higher at 50ºC
        }

        address workerAddress = workerAddresses[lastWorkerPayedIndex];

        uint paymentAmount = ((wageFactor * baseWageUSD) * 10 ** 18 / exchangeRateETHUSD); //salary in WEI    
        payable(workerAddress).transfer(paymentAmount);
        lastWorkerPayedIndex++;
        emit PaymentProcessed(workerAddress, paymentAmount);

    }

    function setUpKeepAddress(address _upKeepContractAddress) external onlyOwner {
        upKeepContractAddress = _upKeepContractAddress;
    }

    function withdrawEth() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    receive() external payable {}
}