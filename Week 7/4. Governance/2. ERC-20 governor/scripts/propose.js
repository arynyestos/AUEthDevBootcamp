const { ethers } = require("hardhat");
const { parseEther } = ethers.utils;

async function main() {
  const [owner] = await ethers.getSigners();

  // Obtenemos las direcciones de los contratos desplegados
  const governorAddress = "0x4D71C75B884d79f0177175a96a46eC47dF251Fd3"; 
  const tokenAddress = "0x69037Cc44E11773D4d0aE40dc6da8E48b7DB6107";

  // Obtenemos las instancias de los contratos en la red Goerli
  const MyGovernor = await ethers.getContractAt("MyGovernor", governorAddress, owner);
  const MyToken = await ethers.getContractAt("MyToken", tokenAddress, owner);

  const tx = await MyGovernor.propose(
    [MyToken.address],
    [0],
    [MyToken.interface.encodeFunctionData("mint", [owner.address, parseEther("100000")])],
    "Give the owner more tokens!"
  );
  const receipt = await tx.wait();
  const event = receipt.events.find(x => x.event === 'ProposalCreated');
  const { proposalId } = event.args;

  console.log("Proposal to mint 2500 tokens to the owner created with ID", proposalId);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });