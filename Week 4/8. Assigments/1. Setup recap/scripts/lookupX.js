const hre = require("hardhat");

const CONTRACT_ADDRESS = "0x96A69ECB5371d151D2Be595EC8a37cb29A43eD3b";

async function main() {

  const contract = await hre.ethers.getContractAt("Contract", CONTRACT_ADDRESS);

  console.log(await contract.x());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
