const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction)
}

function mine() {
    const block = {id:blocks.length, transactions:[]};
    while(block.transactions.length < MAX_TRANSACTIONS && mempool.length > 0){
        block.transactions.push(mempool[0]);
        mempool.shift();
    }
    block.nonce = 0
    do{
    block.hash = SHA256(JSON.stringify(block))
    block.nonce++
    }while(BigInt(`0x${block.hash}`) >= TARGET_DIFFICULTY) 
    blocks.push(block)
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};