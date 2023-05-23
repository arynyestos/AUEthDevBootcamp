export async function getBlock(block){
    console.log('El bloque sobre el que solicita info es: ' + block.queryKey[1]);
    const response = await fetch(`http://localhost:3334/block/${block.queryKey[1]}`)
    const data = await response.json()
    return data
}

export async function getTx(tx){
    console.log(tx.queryKey[1]);
    const response = await fetch(`http://localhost:3334/tx/${tx.queryKey[1]}`)
    const data = await response.json()
    return data
}

export async function getBalance(address){
    console.log(address.queryKey[1]);
    const response = await fetch(`http://localhost:3334/balance/${address.queryKey[1]}`)
    const data = await response.json()
    return data
}