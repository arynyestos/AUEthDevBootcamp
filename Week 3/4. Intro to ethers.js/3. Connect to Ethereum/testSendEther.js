const { assert } = require('chai');
const sendEther = require('./sendEther');
const ethers = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new ethers.providers.Web3Provider(ganacheProvider);
let tx;
describe('sendEther', () => {
    before(async () => {
        tx = await sendEther({
            value: ethers.utils.parseEther("1.0"),
            to: "0x1ba7F7624f42bea90b645618F0C2a6dB476C4A5f",
        });
    })
    it('should resolve with a transaction', async () => {
        assert(tx, "The function did not resolve with a transaction. Did you return the transaction promise?")
        assert.equal(tx.to, "0x1ba7F7624f42bea90b645618F0C2a6dB476C4A5f");
        assert.equal(tx.from, "0xA77e5F2C5314741BE8c30Bae4137ee6986608ff5");
        assert(tx.hash);
    });

    it('should get mined', async () => {
        const receipt = await provider.waitForTransaction(tx.hash);
        assert(receipt);
        assert.equal(receipt.blockNumber, 1);
    });
});