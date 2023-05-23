import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getTx } from './api'
import { Link } from 'react-router-dom'
const { ethers } = require('ethers');

export function Tx() {
    const params = useParams()
    const {data, isLoading, error} = useQuery(['tx', params.hashTx], getTx)

    if(isLoading) 
        return <h1>Loading...</h1>
        
    if(error)
        return <h1>Error (reminder: block hash search is not supported)</h1>

    return <div>
        <h4>Transaction</h4>
        <table className="table">
            <thead>
                <tr>
                    <th>Hash</th>
                    <td>{data.hash}</td>
                </tr>
                <tr>
                    <th>Block</th>
                    <td>
                       <Link to={`/block/${data.blockNumber}`}>{data.blockNumber}</Link> 
                    </td>
                </tr>
                <tr>
                    <th>From</th>
                    <td>
                       <Link to={`/balance/${data.from}`}>{data.from}</Link> 
                    </td>
                </tr>
                <tr>
                    <th>To</th>
                    <td>
                       <Link to={`/balance/${data.to}`}>{data.to}</Link> 
                    </td>
                </tr>
                <tr>
                    <th>Value</th>
                    <td>{ethers.utils.formatEther(data.value.hex)} ETH</td>
                </tr>
                <tr>
                    <th>Data</th>
                    <td style={{ wordWrap: "break-word" }}>{data.data}</td>
                </tr>
                <tr>
                    <th>Gas price</th>
                    <td>{ethers.utils.formatUnits(data.gasPrice.hex, "gwei")} GWEI ({ethers.utils.formatEther(data.gasPrice.hex)} ETH)</td>
                </tr>
            </thead>
        </table>
    </div>
}