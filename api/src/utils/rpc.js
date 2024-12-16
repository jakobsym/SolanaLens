import {PublicKey, Connection} from '@solana/web3.js'
import {deserializeMetadata} from '@metaplex-foundation/mpl-token-metadata'
import { lamports } from '@metaplex-foundation/umi';

// Metaplex Token ProgID: metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s

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

export const fetchTokenMetadata = async(tokenProgramAddress) => {
    const addressPubKey = new PublicKey(tokenProgramAddress);
    const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
    try {
        const accountInfo = await connection.getAccountInfo(addressPubKey);
        const accoutHeader = {
            executable: accountInfo.executable,
            lamports: accountInfo.lamports,
            owner: accountInfo.owner,
            // rentEpoch: optional
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

// TODO: Test
export const fetchTokenSupply = async(tokenAddressObj) => {
    const tokenAddress = tokenAddressObj.tokenAddress
    const supply = 0;
    try {
      const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
      const tokenPubKey = new PublicKey(tokenAddress)
      supply =  await connection.getTokenSupply(tokenPubKey);
    } catch(error) {
      return console.error(error)
    };
    return supply;
  }

export default fetchProgramAddress;