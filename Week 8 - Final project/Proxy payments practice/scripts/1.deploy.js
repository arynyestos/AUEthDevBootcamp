const { ethers, upgrades } = require('hardhat');
const { getContractAddress } = require('@ethersproject/address')


async function main() {

  const TempAdjustedPayments = await ethers.getContractFactory("TempAdjustedPayments");
  console.log("Deploying TempAdjustedPayments...");
  const tempAdjustedPayments = await upgrades.deployProxy(TempAdjustedPayments, [], { initializer: 'initialize' });

  console.log(await tempAdjustedPayments.getAddress(), "tempAdjustedPayments(proxy) address");

  const maxRetries = 10;
  let retryCount = 0;
  let implementationAddress = null;

  while (retryCount < maxRetries) {
    try {
      implementationAddress = await upgrades.erc1967.getImplementationAddress(await tempAdjustedPayments.getAddress());
      break;
    } catch (error) {
      console.log("Failed to get implementation address. Retrying in 1 second...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      retryCount++;
    }
  }

  if (implementationAddress) {
    console.log(implementationAddress, "getImplementationAddress");
    console.log(await upgrades.erc1967.getAdminAddress(await tempAdjustedPayments.getAddress()), "getAdminAddress");
  } else {
    console.log("Failed to get implementation address after maximum retries.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


