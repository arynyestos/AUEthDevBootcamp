const hre = require("hardhat");

const CONTRACT_ADDRESS = "0x96A69ECB5371d151D2Be595EC8a37cb29A43eD3b";

async function main() {

  const contract = await hre.ethers.getContractAt("Contract", CONTRACT_ADDRESS);

  const tx = await contract.changeX(63584); //esto envía la tx

  await tx.wait(); // esto espera a que se haya incluido en un bloque
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
