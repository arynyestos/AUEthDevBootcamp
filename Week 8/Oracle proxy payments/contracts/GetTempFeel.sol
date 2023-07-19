// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract GetTempFeel is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    uint256 public tempFeel;
    bytes32 private jobId;
    uint256 private fee;
    address private paymentsContractAddress;

    event RequestTempFeel(bytes32 indexed requestId, uint256 tempFeel);

    constructor(address _paymentsContractAddress) ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789); // Dirección de LINK en Sepolia
        setChainlinkOracle(0xCD6A6cEA8dFE812f2cb44B6115601918fbcfc515); // Dirección de mi contrato operator
        jobId = "a679de8e1c1f400a93d2ab260c5ea65a";
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
        paymentsContractAddress = _paymentsContractAddress;
    }

    function requestTempFeelData(string memory city) public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        // req.add("city", "Madrid"); 
        req.add("city", city); 
        req.add("path", "data,main,feels_like"); 

        // Multiply the result by 100 to remove decimals
        int256 timesAmount = 100;
        req.addInt("times", timesAmount);

        // Sends the request
        return sendChainlinkRequest(req, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(
        bytes32 _requestId,
        uint256 _tempFeel
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestTempFeel(_requestId, _tempFeel);
        tempFeel = _tempFeel;
        (bool success, ) = paymentsContractAddress.call(abi.encodeWithSignature("callbackTempFeel(uint256)", _tempFeel));
        require(success, "Call to callbackTempFeel failed");
    }
    /**
     * Allow withdraw of Link tokens from the contract
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
}