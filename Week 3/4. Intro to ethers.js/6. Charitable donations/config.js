const { utils } = require('ethers');
const Ganache = require("ganache-core");
const PRIVATE_KEY = "0xcfaa3c75201ece32e481c5139db94a52a4de649a515167956c9df767fe9f55f9";
const INITIAL_BALANCE = utils.parseEther('10');

// create our test account from the private key, initialize it with 10 ether
const accounts = [].concat([{
    balance: INITIAL_BALANCE.toHexString(),
    secretKey: PRIVATE_KEY,
}]);

const ganacheProvider = Ganache.provider({ accounts });

module.exports = {
    INITIAL_BALANCE,
    PRIVATE_KEY,
    ganacheProvider,
}