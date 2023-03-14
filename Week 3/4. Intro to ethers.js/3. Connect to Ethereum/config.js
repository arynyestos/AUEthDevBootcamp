const { ethers } = require('ethers');

const ganacheProvider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');

const PRIVATE_KEY = '0xcfaa3c75201ece32e481c5139db94a52a4de649a515167956c9df767fe9f55f9';

module.exports = {
  ganacheProvider,
  PRIVATE_KEY,
};