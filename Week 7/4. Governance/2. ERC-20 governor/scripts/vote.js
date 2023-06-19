const { ethers } = require("hardhat");

async function main() {
  
  const [owner] = await ethers.getSigners();

  const governorAddress = "0x4D71C75B884d79f0177175a96a46eC47dF251Fd3";

  const MyGovernor = await ethers.getContractAt("MyGovernor", governorAddress, owner);

  const proposalId = ethers.BigNumber.from("90765414476309445676791975803521449245075946958556296796943609240378634605075");

  const tx = await MyGovernor.castVote(proposalId, 1); 

  // const receipt = await tx.wait();

  // console.log("Proposal supported: ", receipt);
  console.log("Proposal supported: ", tx);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });