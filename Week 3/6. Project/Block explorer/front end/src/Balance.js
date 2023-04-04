import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getBalance } from './api'
const { ethers } = require('ethers');

export function Balance() {
    const params = useParams()
    const {data, isLoading, error} = useQuery(['address', params.address], getBalance)

    if(isLoading) 
        return <h1>Loading...</h1>
        
    if(error)
        return <h1>Error</h1>

    return <div>
        <h4>Balance</h4>
        {/* {JSON.stringify(data, null, 4)} */}
        
        <table className="table">
            <thead>
                <tr>
                    <th>Address</th>
                    <td>{params.address}</td>
                </tr>
                <tr>
                    <th>Value</th>
                    <td>{ethers.utils.formatEther(data.balance.hex)} ETH</td>
                </tr>
            </thead>
        </table>
    </div>
}