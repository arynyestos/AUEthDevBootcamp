require("dotenv").config();
const { Alchemy, Network } = require("alchemy-sdk");
const { firstTopic, secondTopic } = require('./topics');
// prefix both the topics with 0x
const topics = [firstTopic(), secondTopic()].map((x) => '0x' + x);

const config = {
    apiKey: process.env.API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

async function totalDaiTransferred(fromBlock, toBlock) {
    const logs = await alchemy.core.getLogs({
        address: "0x6b175474e89094c44da98b954eedeac495271d0f", // <-- TODO #1: fill in the dai address here
        fromBlock,
        toBlock,
        topics
    });

    // take a look at the first log in the response
    //console.log(logs[0]);

    // <-- TODO #2: return the total dai transferred during this timeframe
    // return logs.reduce(function (acum, log) {
    //     return BigInt(acum) + BigInt(log.data);
    // }, 0);
    return logs.reduce((acum, log) => BigInt(acum) + BigInt(log.data), 0);
}

module.exports = totalDaiTransferred;