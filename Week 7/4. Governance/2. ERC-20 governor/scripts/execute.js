const { ethers } = require("hardhat");
const { toUtf8Bytes, keccak256, parseEther } = ethers.utils;

async function main() {

    const [owner] = await ethers.getSigners();

  const governorAddress = "0x4D71C75B884d79f0177175a96a46eC47dF251Fd3"; 
  const tokenAddress = "0x69037Cc44E11773D4d0aE40dc6da8E48b7DB6107"; 
  
    const MyGovernor = await ethers.getContractAt("MyGovernor", governorAddress, owner);
    const MyToken = await ethers.getContractAt("MyToken", tokenAddress, owner);

  const tx = await MyGovernor.execute(
    [MyToken.address],
    [0],
    [MyToken.interface.encodeFunctionData("mint", [owner.address, parseEther("100000")])],
    keccak256(toUtf8Bytes("Give the owner more tokens!"))
  );

  const receipt = await tx.wait();

  console.log("Proposal executed: ", receipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });