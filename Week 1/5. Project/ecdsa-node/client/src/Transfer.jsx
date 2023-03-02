import { useState } from "react";
import server from "./server";
import {keccak256} from "ethereum-cryptography/keccak"
import * as secp from "ethereum-cryptography/secp256k1"

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);
  const keyDict = {
    '9388c2e4a25800b7b85539f47e32f8dfb5246607': "3933c3c4beb2f9dfe15df742ff6f073613a14b3891f3522005f60df9a7e6c46a",
    "d03d8adaecbc1574c78d61d22502a2bcba8935f9": '09c28a68ecbe4aa3c16ddc3537eebe531dda61b6fade8689bc978a90835a31c3',
    'c61148ee02ca054d24e48368272050c03214d80c': "5955f22f4358d1a5f96c79ab6bbbc9de501e32e01e7a11d4ed89c212937f29ba"
  };
  const privateKey = keyDict[address]
  console.log(privateKey)

  async function transfer(evt) {
    evt.preventDefault();

    const message = {
      amount: parseInt(sendAmount),
      recipient: recipient,
    }

    const uint8Message = Uint8Array.from(message); // convert to Uint8Array (array of bytes required by keccak256)
    const messageHash = keccak256(uint8Message)  // hash message
    const [signature, recoveryBit] = await secp.sign(messageHash, privateKey, {recovered:true}) // get signature and recovery bit (necessary to retrieve private key later)

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        message: message,        
        messageHash: messageHash,
        signature: signature,
        recoveryBit: recoveryBit,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
