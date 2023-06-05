const hre = require("hardhat");
// const addr = "0x5fbdb2315678afecb367f032d93f642f64180aa3" // Parte 1
// const addr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" // Parte 2
// const addr = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0" // Parte 3
const addr = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9" // Parte 4

// const { keccak256, hexZeroPad } = hre.ethers.utils; // Parte 2
const { keccak256, toUtf8Bytes } = hre.ethers.utils; // Parte 3

async function lookup(){
    // Parte 1

    // eth_getStorageAt
    // const value0 = await hre.ethers.provider.getStorageAt(addr, "0x0");
    // const value1 = await hre.ethers.provider.getStorageAt(addr, "0x1");
    // console.log(parseInt(value0));
    // console.log(parseInt(value1));

    // Parte 2

    // const key = hexZeroPad(44, 32);
    // const baseSlot = hexZeroPad(0x2, 32).slice(2);
    // console.log(key + baseSlot)
    // const slot = keccak256(key + baseSlot);
    // const value = await hre.ethers.provider.getStorageAt(addr, slot);
    // console.log(parseInt(value));

    // Parte 3
    // const slot = keccak256(toUtf8Bytes("Ynyesto"));
    // const value = await hre.ethers.provider.getStorageAt(addr, slot);
    // console.log(parseInt(value));

    // Parte 4
    const storage = await hre.ethers.getContractAt("Storage", addr);

    await storage.check();
}

lookup();