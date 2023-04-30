// // import { Alchemy, Network } from "alchemy-sdk";
const { Alchemy, Network } = require('alchemy-sdk');

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);
let data;
let contractAddressList = [];

async function getTransfers(){
    data = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: "0x59dfDd2af55E3D636A2cc0a3338615E59056E478",
        // category: ["external", "internal", "erc20", "erc721", "erc1155"],
        category: ["external"],
      });      
}

async function getDeployedContractAddresses(){
    const promises = data.transfers.map(async transfer => {
      const receipt = await alchemy.core.getTransactionReceipt(transfer.hash); 
      if(receipt.contractAddress !== null) {
        return receipt.contractAddress;
      } else {
        return null;
      }
    })
    contractAddressList = await Promise.all(promises);
    contractAddressList = contractAddressList.filter(address => address !== null);
}
  

async function main(){
    await getTransfers();
    await getDeployedContractAddresses();
    // console.log(data.transfers[0].hash);
    console.log(contractAddressList);
    console.log(data.transfers.length);
}

main();
