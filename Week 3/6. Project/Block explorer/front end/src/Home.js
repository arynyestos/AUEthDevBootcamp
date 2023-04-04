import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link } from "react-router-dom"
import { useForm } from 'react-hook-form'

import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


const alchemy = new Alchemy(settings);

function Home() {
      const {register, handleSubmit} = useForm()
      const navigate = useNavigate()
      const submitInfo = (data) => {
          if(data.formData.length === 66) // Si la longitud es 66 navegamos a tx
              navigate(`tx/${data.formData}`)
          if(data.formData.length === 42) // Si la longitud es 42 navegamos a saldo
              navigate(`balance/${data.formData}`)
          if(/^\d+\.?\d*$/.test(data.formData)) //Si el dato es un número navegamos a bloque
              navigate(`block/${data.formData}`)
      }

      const [blockNumber, setBlockNumber] = useState();
      const [blockInfo, setBlockInfo] = useState();
      const [transactions, setTransactions] = useState();
      const [showFullList, setShowFullList] = useState(false);

      useEffect(() => {
        async function getBlockNumber() {
          setBlockNumber(await alchemy.core.getBlockNumber());
        }
        getBlockNumber();
      });

      useEffect(() => {
        async function getBlockInfo() {
          console.log("En home, el número de bloque es: " + blockNumber)
          setBlockInfo(await alchemy.core.getBlock(blockNumber));
        }

        getBlockInfo();
      }, [blockNumber]);

      useEffect(() => {
        async function getBlockTransactions() {
          setTransactions((await alchemy.core.getBlockWithTransactions(blockNumber)).transactions);
        }

        getBlockTransactions();
      }, [blockNumber]);

      return <div className="container">
            {/* <h3 className="text-center my-3">Ethereum blockchain explorer</h3>
            <form className='d-flex justify-content-center gap-1' onSubmit={handleSubmit(submitInfo)}>
                <input {...register('formData')} size={70}></input>
                <button className="mx-3 btn btn-primary">Search</button>
            </form>
            <div className="border my-3 p-2">
                <Outlet></Outlet>
            </div> */}
          <h2 className="text-center">Last block: {blockNumber}</h2>
          {/* <div className="App">Block Info: {JSON.stringify(blockInfo)}</div> */}
          {blockInfo && <div>
            <table className='table'>
              <tbody>
                <tr>
                  <td>Hash:</td>
                  <td>{blockInfo.hash}</td>
                </tr>
                <tr>
                  <td>Parent Hash:</td>
                  <td>{blockInfo.parentHash}</td>
                </tr>
                <tr>
                  <td>Number:</td>
                  <td>{blockInfo.number}</td>
                </tr>
                <tr>
                  <td>Timestamp:</td>
                  <td>{blockInfo.timestamp}</td>
                </tr>
                <tr>
                  <td>Nonce:</td>
                  <td>{blockInfo.nonce}</td>
                </tr>
                <tr>
                  <td>Difficulty:</td>
                  <td>{blockInfo.difficulty}</td>
                </tr>
                <tr>
                  <td>Gas Limit:</td>
                  <td>{blockInfo.gasLimit.hex}</td>
                </tr>
                <tr>
                  <td>Gas Used:</td>
                  <td>{blockInfo.gasUsed.hex}</td>
                </tr>
                <tr>
                  <td>Miner:</td>
                  <td>{blockInfo.miner}</td>
                </tr>
                <tr>
                  <td>Extra data:</td>
                  <td>{blockInfo.extraData}</td>
                </tr>
                <tr>
                  <td>Transactions:</td>
                  {/* <td>{blockInfo.transactions.join(", ")}</td> */}
                  <td>
                    {showFullList ? (
                      <div>
                        <a className="button-link" onClick={() => setShowFullList(false)}>Hide transactions</a>
                        {blockInfo.transactions.map((tx, indice) => 
                            <tr key={indice}> 
                                <Link to={`/tx/${tx}`}>{tx}</Link> 
                            </tr>
                        )}
                      </div>
                      ) : (
                        <a className="button-link" onClick={() => setShowFullList(true)}>See full list ({blockInfo.transactions.length} transactions)</a>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Base Fee Per Gas:</td>
                  <td>{blockInfo.baseFeePerGas.hex}</td>
                </tr>
              </tbody>
            </table>
          </div>
          }
          {/* <div className="App">Block Transactions: {JSON.stringify(transactions)}</div> */}
        </div>
}

export default Home;