import {PublicKey, Connection} from '@solana/web3.js'
import {deserializeMetadata} from '@metaplex-foundation/mpl-token-metadata'

// Metaplex Token ProgID: metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s
const MAINNET_CONNECTION = "https://api.mainnet-beta.solana.com"

export const fetchProgramAddress = async(tokenAddressObj) => {
    const tokenPubKey = new PublicKey(tokenAddressObj.tokenAddress);
    const metaPlexPubKey = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")
    const seeds = ["metadata", metaPlexPubKey.toBuffer(), tokenPubKey.toBuffer()]

    try {   
        var [tokenProgramAddress] = PublicKey.findProgramAddressSync(seeds, metaPlexPubKey)
    } catch(error) {
        console.error(error)
        throw error
    }
    return tokenProgramAddress
}


export const fetchTokenMetadata = async(tokenAddressObj) => {
    const tokenProgramAddress = await fetchProgramAddress(tokenAddressObj)
    const addressPubKey = new PublicKey(tokenProgramAddress);
    const connection = new Connection(MAINNET_CONNECTION, 'confirmed');
    try {
        const accountInfo = await connection.getAccountInfo(addressPubKey);
        const accoutHeader = {
            executable: accountInfo.executable,
            lamports: accountInfo.lamports,
            owner: accountInfo.owner,
            // rentEpoch?:
        }
        const rpcAccount = {
            ...accoutHeader,
            data: accountInfo.data,
            publicKey: addressPubKey
        }
        const metadata = deserializeMetadata(rpcAccount)
        return metadata
    } catch(error) {
        console.error(error)
        throw error
    }
}


export const fetchNameAndSymbol = async(tokenAddressObj) => {
    const tokenProgramAddress = await fetchProgramAddress(tokenAddressObj)
    const addressPubKey = new PublicKey(tokenProgramAddress);
    const connection = new Connection(MAINNET_CONNECTION, 'confirmed');
    try {
        const accountInfo = await connection.getAccountInfo(addressPubKey);
        const accoutHeader = {
            executable: accountInfo.executable,
            lamports: accountInfo.lamports,
            owner: accountInfo.owner,
            // rentEpoch?:
        }
        const rpcAccount = {
            ...accoutHeader,
            data: accountInfo.data,
            publicKey: addressPubKey
        }
        const metadata = deserializeMetadata(rpcAccount)
        return [metadata.name, metadata.symbol]
    } catch(error) {
        console.error(error)
        throw error
    }
}


export const fetchTokenAge = async(tokenAddressObj) => {
    const connection = new Connection(MAINNET_CONNECTION, 'confirmed')
    try{
        const metadata = await fetchTokenMetadata(tokenAddressObj);
        const tokenPubKey = new PublicKey(metadata.publicKey)
        const transactions = await connection.getSignaturesForAddress(tokenPubKey);
        const firstTransacation = transactions.pop().signature
        
        const transactionsDetails = await connection.getTransaction(firstTransacation,  {
            maxSupportedTransactionVersion: 0
        })
        //const metadata = await fetchTokenMetadata(tokenAddressObj.tokenAddress)
        const blockTime = transactionsDetails.blockTime
        const tokenAge = new Date(blockTime * 1000).toLocaleString()
        
        return tokenAge
    }catch(error) {
        console.error(error)
        throw error
    }
}


// TODO: Create a function that unwraps the tokenAddress?

export const fetchTokenSupply = async(tokenAddressObj) => {
    const tokenAddress = tokenAddressObj.tokenAddress
    
    try {
      const connection = new Connection(MAINNET_CONNECTION, 'confirmed');
      const tokenPubKey = new PublicKey(tokenAddress)
      const supply = await connection.getTokenSupply(tokenPubKey);
      return supply.value['uiAmount']
    } catch(error) {
        console.error(error)
        throw error  
    };
}



export default fetchProgramAddress;