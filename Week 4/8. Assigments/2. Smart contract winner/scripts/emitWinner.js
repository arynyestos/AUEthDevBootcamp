const hre = require("hardhat");

const CONTRACT_ADDRESS = "0x0fDd52D965cb80C1404a769A24A9F7e1a7abf846";

async function main() {

  const contract = await hre.ethers.getContractAt("Proxy", CONTRACT_ADDRESS);

  const tx = await contract.emitWinner("0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502"); //esto envía la tx

  await tx.wait(); // esto espera a que se haya incluido en un bloque
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
