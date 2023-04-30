import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(config);

async function getTransfers(address){
    const data = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: address,
        category: ["external"],
    });      
    return data;
}

export default async function getContractAddresses(address){
    const data = await getTransfers(address);
    const promises = data.transfers.map(async transfer => {
      const receipt = await alchemy.core.getTransactionReceipt(transfer.hash); 
      if(receipt.contractAddress !== null) {
        return receipt.contractAddress;
      } else {
        return null;
      }
    })
    const contractAddressList = await Promise.all(promises);
    return contractAddressList.filter(address => address !== null);
}

// export {
//   getContractAddresses
// }
