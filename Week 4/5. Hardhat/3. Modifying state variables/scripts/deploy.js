const ethers = require('ethers');
require('dotenv').config();

async function main() {

  const url = process.env.TESTNET_ALCHEMY_RPC_URL;

  let artifacts = await hre.artifacts.readArtifact("ModifyVariable");

  const provider = new ethers.providers.JsonRpcProvider(url);

  let privateKey = process.env.PRIVATE_KEY;

  let wallet = new ethers.Wallet(privateKey, provider);

  // Create an instance of a Faucet Factory
  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

  let variablesContract = await factory.deploy(10, "someString");

  console.log("Contract state variables' values:", await variablesContract.x(), await variablesContract.someString());

  await variablesContract.deployed();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});