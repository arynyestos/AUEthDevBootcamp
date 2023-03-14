require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`;

async function getTotalBalance(addresses) {
    const batch = []
    // TODO: fill in with several JSON RPC requests
    addresses.forEach((address, index) => {
        batch[index] = {
            jsonrpc: "2.0",
            id: index + 1,
            method: "eth_getBalance",
            params: [address]
        }
    })

    const response = await axios.post(url, batch);
    let totalBalance = 0
    response.data.forEach((res) => {
        totalBalance += parseInt(res.result)
    })

    
    // use this if you want to inspect the response data!
    // console.log(response.data);
    
    // return the total balance of all the addresses 
    return(totalBalance)
}

module.exports = getTotalBalance;