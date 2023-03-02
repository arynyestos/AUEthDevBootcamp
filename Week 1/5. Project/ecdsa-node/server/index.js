const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { keccak256 } = require("ethereum-cryptography/keccak");
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils")

app.use(cors());
app.use(express.json());

const balances = {
  // Private key: 3933c3c4beb2f9dfe15df742ff6f073613a14b3891f3522005f60df9a7e6c46a
  "9388c2e4a25800b7b85539f47e32f8dfb5246607": 100,
  // Private key: 09c28a68ecbe4aa3c16ddc3537eebe531dda61b6fade8689bc978a90835a31c3
  "d03d8adaecbc1574c78d61d22502a2bcba8935f9": 50,
  // Private key: 5955f22f4358d1a5f96c79ab6bbbc9de501e32e01e7a11d4ed89c212937f29ba
  "c61148ee02ca054d24e48368272050c03214d80c": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
// TODO: get a signature from the client-side application
// recover the address from the signature (that will be the sender)

  const { message, messageHash, signature, recoveryBit } = req.body;  
  const uint8Message = Uint8Array.from(message); 
  const calculatedHash = keccak256(uint8Message)
  let arr = []
  Object.keys(messageHash).forEach(key => {
    arr[parseInt(key)] = messageHash[key]  
  });
  const receivedHash = Uint8Array.from(arr);
  let arr2 = []
  Object.keys(signature).forEach(key => {
    arr2[parseInt(key)] = signature[key]  
  });
  const receivedSignature = Uint8Array.from(arr2);

  // If the hash given by the client is not the same as the hash calculated by the server something is amiss
  if (toHex(calculatedHash) === toHex(receivedHash)){
    const publicKey = secp.recoverPublicKey(receivedHash, receivedSignature, recoveryBit)
    const sender = toHex(keccak256(publicKey.slice(1)).slice(-20))
    const amount = message.amount
    const recipient = message.recipient
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}