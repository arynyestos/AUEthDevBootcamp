const { ethers } = require("hardhat");
const { toUtf8Bytes, keccak256, parseEther } = ethers.utils;

async function main() {
  
  const [owner] = await ethers.getSigners();
  
  // const governorAddress = "0x60B6B0e09AF27b2054B171256420E40498E697EC"; // dirección vieja
  const governorAddress = "0x4D71C75B884d79f0177175a96a46eC47dF251Fd3"; // dirección nueva
  // const tokenAddress = "0x2F0C694F1026673858558244caEf0A94cAA6Cf5b"; // dirección vieja
  const tokenAddress = "0x69037Cc44E11773D4d0aE40dc6da8E48b7DB6107"; // dirección nueva

  const MyGovernor = await ethers.getContractAt("MyGovernor", governorAddress);
  const MyToken = await ethers.getContractAt("MyToken", tokenAddress);


  const proposalId = await MyGovernor.hashProposal(
    [MyToken.address],
    [0],
    [MyToken.interface.encodeFunctionData("mint", [owner.address, parseEther("100000")])],
    keccak256(toUtf8Bytes("Give the owner more tokens!"))
  );

  const proposalState = await MyGovernor.state(proposalId);

  console.log("proposalId is", proposalId);

  console.log("state is", proposalState);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
