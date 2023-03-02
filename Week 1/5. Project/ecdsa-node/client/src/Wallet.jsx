import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1'
import {keccak256} from 'ethereum-cryptography/keccak'
import {toHex} from 'ethereum-cryptography/utils'

// function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
function Wallet({ address, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    // const privateKey = evt.target.value;
    // setPrivateKey(privateKey);
    // const publicKey = secp.getPublicKey(privateKey);
    // const address = toHex(keccak256(publicKey.slice(1)).slice(-20))
    const address = evt.target.value;
    setAddress(address);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Address
        <input placeholder="Type in an address" value={address} onChange={onChange}></input>
      </label>

      <div>
        Address: {address}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
