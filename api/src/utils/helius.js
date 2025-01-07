import { Helius } from "helius-sdk"
import { PublicKey } from "@solana/web3.js"
import 'dotenv/config'
import { fetchTokenSupply } from "./rpc.js"

const helius = new Helius(process.env.HELIUS_API_KEY)

// `walletAddressObj`: Object
// return: Array of Token Object(s) 
const fetchWalletContent = async(walletAddress) => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  var totalPages = 0

  var walletContent = {
    walletAddress: walletAddress,
    tokens: [],
  }

  try {
    let initRes = await helius.rpc.getTokenAccounts({
      page: 1,
      limit: 100,
      options: {
        showZeroBalance: false
      },
      owner: walletAddress
    });

    // get total pages for given addresss
    totalPages = initRes.total
  
    for (const token of initRes.token_accounts) {
      walletContent.tokens.push({
        "token_address": token.mint,
        "amount": token.amount
      })

    }
    for (let page = 2; page <= totalPages; page+=1){
      await delay(25)
      try {
        let res = await helius.rpc.getTokenAccounts({
          page: page,
          limit: 100,
          options: {
            showZeroBalance: false
          },
          owner: walletAddress
        })
        for (const token of res.token_accounts) {
          walletContent.tokens.push({
            "token_address": token.mint,
            "amount": token.amount,
          })
        }
      } catch (error) {
        console.error(error)
      }
    }

  } catch (error) {
    console.error(error)
  }
  return walletContent.tokens
}
// way to get top 10 holders of a given token
// input: a coin address from telegram

//TODO: Consider how caching the created set helps with lookup in the future
// TODO: Handler Catch errors 
export const fetchTokenHolderAmount = async(tokenAddress) => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  let page = 1
  let tokenHolders = new Set()
  
  try {
    while(true) {
      const initRes = await helius.rpc.getTokenAccounts({
      page: page,
      limit: 1000,
      options:{
        showZeroBalance: false
      },
      mint: tokenAddress
    })
    for(const holders in initRes.token_accounts){
      tokenHolders.add({ownerAddress: holders.owner, tokenAmount: holders.amount})
    }
    page++;
    if (initRes.token_accounts.length === 0) {
      break
    } 
    }
  } catch(error) {
    console.error(error)
    throw error
  }
  return tokenHolders.size;
}


// rate limited to 600req/min
export const fetchTokenPrice = async(tokenAddress) => {
  var url = 'https://api.jup.ag/price/v2?ids='
  url += tokenAddress;
  var price = 0;

  try {
    const res = await fetch(url);
    
    if(!res.ok) {
      throw new Error(`Response status: ${response.status}`);
    };
    
    const jsonRes = await res.json()
    price = jsonRes.data[tokenAddress].price

  }catch(error){
    console.error("error fetching price", error)
  };

  return price;
}


export const fetchTokenFDV = async(price, tokenAddress) => {
  try {
    const supply = await fetchTokenSupply(tokenAddress)
    return price * supply
  } catch (error) {
    console.error(error)
    throw error
  }
}

const fetchTop10Holders = async(tokenHolderSet) => {
  

}

/* Does not work currently */
// fetches ONLY from Raydium Pools
// Raydium PID: 675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8
// baseMint: offset of 8 bytes
// quoteMint: offset of 40 bytes
export const fetchTokenLiquidity = async(tokenAddressObj) => {
  const tokenAddress = tokenAddressObj.tokenAddress;
  const tokenPubKey = new PublicKey(tokenAddress)
  const raydiumID = "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"
  const url = process.env.HELIUS_RPC_URL
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "raydium-pools",
        method: "getProgramAccounts",
        params: [
          "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8", 
          {
            "encoding": "jsonParsed",
            "filters": [
              {
                "dataSize": 392 
              },
              {
                "memcmp": {
                  "offset": 8,
                  "bytes": tokenPubKey
                },
              },
              /*
              {
                "memcmp": {
                  "offset": 40,
                  "bytes": tokenPubKey
                },
              },
              */
            ],
          },
        ],
      })
    });

    const data = await res.json()
    return JSON.stringify(data) 
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default fetchWalletContent