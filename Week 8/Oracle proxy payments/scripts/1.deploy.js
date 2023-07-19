const { ethers, upgrades } = require('hardhat');
const { getContractAddress } = require('@ethersproject/address')

async function main() {

  const [owner] = await ethers.getSigners();
  const transactionCount = await owner.getNonce();

  // gets the address of the token before it is deployed
  const proxyAddress = getContractAddress({
    from: owner.address,
    nonce: transactionCount + 2
  });

  console.log("Future proxy address:", proxyAddress)

  console.log("Deploying data fetching contracts...");
  
  const GetEthPrice = await ethers.getContractFactory("GetEthPrice");
  const getEthPrice = await GetEthPrice.deploy(proxyAddress);
  const getEthPriceAddress = await getEthPrice.getAddress()
  console.log("ETH price contract deployed to:", getEthPriceAddress);

  const GetTempFeel = await ethers.getContractFactory("GetTempFeel");
  const getTempFeel = await GetTempFeel.deploy(proxyAddress);
  const getTempFeelAddress = await getTempFeel.getAddress()
  console.log("Temp feel contract deployed to:", getTempFeelAddress);

  const TempAdjustedPayments = await ethers.getContractFactory("TempAdjustedPayments");
  console.log("Deploying TempAdjustedPayments...");
  const tempAdjustedPayments = await upgrades.deployProxy(TempAdjustedPayments, [getEthPriceAddress,getTempFeelAddress], { initializer: 'initialize' });

  console.log(await tempAdjustedPayments.getAddress(), "tempAdjustedPayments(proxy) address");

  const maxRetries = 15;
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