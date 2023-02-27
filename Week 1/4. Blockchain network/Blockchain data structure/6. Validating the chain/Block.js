const SHA256 = require('crypto-js/sha256');

class Block {

    toHash() {
        return SHA256(this.previousHash + this.data)
    }

    constructor(data){
        this.previousHash;
        this.data = data
    }
}

module.exports = Block;
