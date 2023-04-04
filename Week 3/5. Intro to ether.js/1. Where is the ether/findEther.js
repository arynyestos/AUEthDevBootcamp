const { providers } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

/**
 * Given an ethereum address find all the addresses
 * that were sent ether from that address
 * @param {string} address - The hexadecimal address for the sender
 * @async
 * @returns {Array} all the addresses that received ether
 */
async function findEther(address) {
    let addresses = []
    const numOfBlocks = await provider.getBlockNumber()
    for(let i = 1; i <= numOfBlocks; i++){
        currentBlock = await provider.getBlockWithTransactions(i)
        currentBlock.transactions.forEach(transaction => {
            if(transaction.from === address) addresses.push(transaction.to)
        })
    }
    return addresses
}

module.exports = findEther;