const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Proxy", function () {
  async function deployFixture() {
    const Proxy = await ethers.getContractFactory("Proxy");
    const proxy = await Proxy.deploy();
    const Logic1 = await ethers.getContractFactory("Logic1");
    const logic1 = await Logic1.deploy();
    const Logic2 = await ethers.getContractFactory("Logic2");
    const logic2 = await Logic2.deploy();

    const proxyAsLogic1 = await ethers.getContractAt("Logic1", proxy.address);
    const proxyAsLogic2 = await ethers.getContractAt("Logic2", proxy.address);
    
    return { proxy, logic1, logic2, proxyAsLogic1, proxyAsLogic2 };
  }

  async function lookUpUint(contractAddr, slot) {
    return parseInt(await ethers.provider.getStorageAt(contractAddr, slot));
  }
  
  it("Should work with logic 1", async function () {
    const { proxy, proxyAsLogic1, logic1 } = await loadFixture(deployFixture);

    await proxy.changeImplementation(logic1.address);
    // assert.equal(await logic1.x(), 0);
    // assert.equal(await lookUpUint(logic1.address, "0x0"), 0);
    assert.equal(await lookUpUint(proxy.address, "0x0"), 0);
    
    // await proxy.changeX(52);
    await proxyAsLogic1.changeX(52);
    // assert.equal(await logic1.x(), 52);
    // assert.equal(await lookUpUint(logic1.address, "0x0"), 52);
    assert.equal(await lookUpUint(proxy.address, "0x0"), 52);
  });

  it("Should work with upgrades (logic 2)", async function () {
    const { proxy, proxyAsLogic1, proxyAsLogic2, logic1, logic2 } = await loadFixture(deployFixture);

    // Start at logic 1
    await proxy.changeImplementation(logic1.address);
    assert.equal(await logic1.x(), 0);    
    // await proxy.changeX(45);
    await proxyAsLogic1.changeX(45);
    // assert.equal(await logic1.x(), 45);
    // assert.equal(await lookUpUint(logic1.address, "0x0"), 45);
    assert.equal(await lookUpUint(proxy.address, "0x0"), 45);

    // Upgrade to logic 2
    await proxy.changeImplementation(logic2.address);
    // assert.equal(await logic2.x(), 0);
    // assert.equal(await lookUpUint(logic2.address, "0x0"), 0);
    assert.equal(await lookUpUint(proxy.address, "0x0"), 45);
    // await proxy.changeX(79);
    await proxyAsLogic2.changeX(79);
    await proxyAsLogic2.tripleX();
    // assert.equal(await logic2.x(), 237);
    // assert.equal(await lookUpUint(logic2.address, "0x0"), 237);
    assert.equal(await lookUpUint(proxy.address, "0x0"), 237);
  });

});
