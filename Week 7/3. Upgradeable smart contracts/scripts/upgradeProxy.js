const { ethers, upgrades } = require('hardhat');

// TO DO: Place the address of your proxy here!
const proxyAddress = '0x814A9afDeF3484D80772ec90479482461ED60F8a';

async function main() {
  const VendingMachineV3 = await ethers.getContractFactory('VendingMachineV3');
  const upgraded = await upgrades.upgradeProxy(proxyAddress, VendingMachineV3);

  console.log("The current contract owner is: " + await upgraded.owner());

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);

  console.log('Implementation contract address: ' + implementationAddress);
}

main();