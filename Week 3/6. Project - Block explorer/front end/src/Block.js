import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getBlock } from './api'
import { Link } from 'react-router-dom'

export function Block() {
    const params = useParams()
    const {data, isLoading, error} = useQuery(['blockNum', params.blockNum], getBlock)

    if(isLoading) 
        return <h1>Loading...</h1>
        
    if(error)
        return <h1>Error</h1>

    const transactions = data && data.transactions ? data.transactions : []

    return <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Transaction list</th>
                </tr>
            </thead>
            <tbody>
                {
                    // data.transactions.map((tx, index) => 
                    transactions.map((tx, index) => 
                        <tr key={index}>  
                            <Link to={`/tx/${tx}`}>{tx}</Link> 
                        </tr>
                    )
                }
            </tbody>
        </table>
        {/* <pre>
            <h4>Block</h4>
            {JSON.stringify(data, null, 4)}
        </pre> */}
    </div>
    
}