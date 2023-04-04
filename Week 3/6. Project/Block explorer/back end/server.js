const ex = require('express')
const { Alchemy, Network } = require('alchemy-sdk');
const cors = require('cors')
require('dotenv').config()

const server = ex()
server.use(cors())

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  
const alchemy = new Alchemy(settings);

server.get("/", async (req,res) => {
    const blockNumber = await alchemy.core.getBlockNumber()
    res.send({blockNumber})
})

server.get("/block/:blockNumber", async (req,res) => {
    try{
        console.log("Al servidor le llega el siguiente bloque: " + req.params.blockNumber)
        const block = await alchemy.core.getBlock(req.params.blockNumber)
        res.send(block)
    }catch(error) {
        res.status(500).send({mensaje: error.message})
    }
})

server.get("/tx/:numTx", async (req,res) => {
    const tx = await alchemy.core.getTransaction(req.params.numTx)
    res.send(tx)
})


server.get("/balance/:address", async (req,res) => {
    const balance = await alchemy.core.getBalance(req.params.address)
    // res.send({balance, ethers: balance/1e18, ethers2: web3.utils.fromWei(balance, 'ether')})
    res.send({balance, ethers: balance/1e18})
})

server.listen(3334)