const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const recipients = [
    "0x31e0FacEa072EE621f22971DF5bAE3a1317E41A4",
    "0x430bc8Af8cE9DF806f32Aeb8b7F33DEffeF6a061"
  ];
  const amount = ethers.utils.parseUnits("1000", "18");

  // Get ToniCoin contract instance 
  const contractAddr = "0xf2092DA6f7b14AC5EA7224142d62Ed390a68C919";
  const ToniCoin = await hre.ethers.getContractFactory("ToniCoin");
  const toniCoin = await ToniCoin.attach(contractAddr);

  // Airdrop TCN to recipients
  for (const recipient of recipients) {
    console.log(`Sending ${amount} TCN to ${recipient}...`);
    await toniCoin.transfer(recipient, amount);
  }

  console.log("Airdrop completed!");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
