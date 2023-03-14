const axios = require('axios');
require("dotenv").config()

// copy-paste your URL provided in your Alchemy.com dashboard
// const ALCHEMY_URL = "";

// axios.post(ALCHEMY_URL, {

//Get block number
axios.post(process.env.ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_getBlockByNumber",
  params: [
    "0xb443", // block 46147
    false  // retrieve the full transaction object in transactions array
  ]
}).then((response) => {
  console.log("Get block number response:");
  console.log(response.data.result);
});

//Get transaction count
axios.post(process.env.ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_getTransactionCount",
  params: [
    "0x506f776572656420627920626c6f58726f757465", 
    "latest"  
  ]
}).then((response) => {
  console.log("Get transaction count response:");
  console.log(response.data.result);
});

//Get transaction by hash
axios.post(process.env.ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 0,
  method: "eth_getTransactionByHash",
  params: [
    "0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"
  ]
}).then((response) => {
  console.log("Get transaction by hash response:");
  console.log(response.data.result);
});