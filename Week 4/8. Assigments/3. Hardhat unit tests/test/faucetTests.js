const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('Faucet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory('Faucet'); // Faucet is a factory for instances of our faucet contract
    const faucetETH = ethers.utils.parseEther('100'); // convierte 1 ETH a su representación en wei
    const faucet = await Faucet.deploy({ value: faucetETH });


    const [owner, otherSigner] = await ethers.getSigners();
    let withdrawAmount = ethers.utils.parseUnits("0.15", "ether");

    console.log('Signer 1 address: ', owner.address);
    console.log('Signer 2 address: ', otherSigner.address);
    return { faucet, owner, withdrawAmount, otherSigner };
  }

  it('should deploy and set the owner correctly', async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
    expect(await faucet.owner()).to.equal(owner.address);
  });

  it('should not allow withdrawals above 0.1 ETH at a time', async function () {
    const { faucet, withdrawAmount } = await loadFixture(deployContractAndSetVariables);
    console.log('Requested amount:', ethers.utils.formatEther(withdrawAmount), 'ETH');
    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });

  it('Only the owner should be able to call these functions', async function () {
    const { faucet, otherSigner } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.connect(otherSigner).withdrawAll()).to.be.reverted;
    await expect(faucet.connect(otherSigner).destroyFaucet()).to.be.reverted;
    await expect(faucet.withdrawAll()); // this is equivalent to faucet.connect(owner).withdrawAll()
    await expect(faucet.destroyFaucet()); 
  });

  it('should return all the ETH to the owner', async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
    const faucetInitBalance = await ethers.provider.getBalance(faucet.address);
    const ownerInitBalance = await ethers.provider.getBalance(owner.address);
    await faucet.withdrawAll();
    const faucetFinalBalance = await ethers.provider.getBalance(faucet.address);
    const ownerFinalBalance = await ethers.provider.getBalance(owner.address);
    // Owner pays for the transaction to withdraw all funds, so the amounts won't be equal to the last WEI
    const ownerInitETH = parseFloat(parseFloat(ethers.utils.formatEther(ownerInitBalance.toString(), 'wei')).toFixed(3))
    const ownerFinalETH = parseFloat(parseFloat(ethers.utils.formatEther(ownerFinalBalance.toString(), 'wei')).toFixed(3))
    const faucetInitETH = parseFloat(parseFloat(ethers.utils.formatEther(faucetInitBalance.toString(), 'wei')).toFixed(3))
    await expect(faucetFinalBalance).equals(0);
    await expect(ownerFinalETH === ownerInitETH + faucetInitETH).to.be.true;
  });

  it('should destroy the contract', async function () {
    const { faucet } = await loadFixture(deployContractAndSetVariables);
    await faucet.destroyFaucet();
    const code = await ethers.provider.getCode(faucet.address);
    console.log(code);
    await expect(code === "0x").to.be.true;
  });
});