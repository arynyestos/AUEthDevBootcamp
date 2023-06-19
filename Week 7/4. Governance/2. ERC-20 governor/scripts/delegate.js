const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  // Obtenemos las direcciones de los contratos desplegados
  // const tokenAddress = "0x2F0C694F1026673858558244caEf0A94cAA6Cf5b"; // dirección vieja
  const tokenAddress = "0x3681E3434956E411dFcf69a48a6222F95749D40B"; // dirección nueva

  // Obtenemos la instancias del contrato en la red Goerli
  // const MyToken = await ethers.getContractAt("MyToken", tokenAddress);
  const MyToken = await ethers.getContractAt("MyToken", tokenAddress, owner);

  // Delegamos los votos al owner
  await MyToken.delegate(owner.address);

  console.log("Voting power delegated to owner:", owner.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
