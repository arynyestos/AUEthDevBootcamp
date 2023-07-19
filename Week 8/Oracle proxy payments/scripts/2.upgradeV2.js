const { ethers, upgrades } = require('hardhat');

const proxyAddress = '0x4350906Ceb5b4D1315df496B8e2867d6c4f065d1'

async function main() {
  console.log("Original TempAdjustedPayments(proxy) address:", proxyAddress)

  const TempAdjustedPaymentsV2 = await ethers.getContractFactory("TempAdjustedPaymentsV2");
  console.log("Upgrade to TempAdjustedPaymentsV2...");
  const tempAdjustedPaymentsV2 = await upgrades.upgradeProxy(proxyAddress, TempAdjustedPaymentsV2);

  console.log("tempAdjustedPaymentsV2(proxy) address should be the same:", await tempAdjustedPaymentsV2.getAddress());
  console.log("V2 implementation address:", await upgrades.erc1967.getImplementationAddress(await tempAdjustedPaymentsV2.getAddress()), "getImplementationAddress");
  console.log("ProxyAdmin address should be the same:", await upgrades.erc1967.getAdminAddress(await tempAdjustedPaymentsV2.getAddress()), "getAdminAddress");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});