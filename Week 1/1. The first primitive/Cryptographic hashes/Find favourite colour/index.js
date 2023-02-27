const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

// the possible colors that the hash could represent
const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

// given a hash, return the color that created the hash
function findColor(hash) {
    var hashArray = [];
    for (let i = 0; i < COLORS.length; i++) {
        hashArray[i] = toHex(sha256(utf8ToBytes(COLORS[i])))
    }
    for (let i = 0; i < hashArray.length; i++) {
        if (hashArray[i] == toHex(hash)){
            return COLORS[i]        }
    }
}

module.exports = findColor;