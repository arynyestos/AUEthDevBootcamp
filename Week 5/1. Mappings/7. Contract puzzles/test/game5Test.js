const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck

    let winnerAddress = ''
    let wallet;
    
    //Create winner address
    while (!winnerAddress.startsWith('0x00')) {
      wallet = ethers.Wallet.createRandom();
      winnerAddress = wallet.address;
    }
    
    // Add to test network
    wallet = wallet.connect(ethers.provider);


    // Add funds to newly added winner address through a tx from one of the original addresses
    const originalSigner = ethers.provider.getSigner();

    const transaction = {
      to: winnerAddress,
      value: ethers.utils.parseEther("1.0")
    };
    
    const txResponse = await originalSigner.sendTransaction(transaction);
    await txResponse.wait();  // wait for transaction to be added to a block

    //Win
    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
