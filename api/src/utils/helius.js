import { Helius } from "helius-sdk"
import 'dotenv/config'

const helius = new Helius(process.env.HELIUS_API_KEY)

// walletAddress: String
// return: Object 
// TODO: Pass in a wallet address as parameter
export default fetchWalletContent = async(walletAddress) => {
  var totalPages = 0

  var walletContent = {
    walletAddress: walletAddress,
    tokens: [],
  }

  // TODO: Maybe split these into seperate functions
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
      // initRes[tpData] gives :value
    }
  } catch (error) {
    console.error(error)
  }

  walletContent = getTokenAccountsPaginated(totalPages, walletAddress)
  return walletContent
}

// totalPages: number
// returns: Object
const getTokenAccountsPaginated = async(totalPages, walletAddress) => {
  var tempWalletContent = {
    walletAddress: walletAddress,
    tokens: [],
  }

  // iterate over all remaining pages capturing data
  for (let page = 2; page <= totalPages; totalPages+=1) {
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
        tempWalletContent.tokens.push({
          "token_address": token.mint,
          "amount": token.amount,
        })
      }

    } catch (error) {
      console.error(error)
      break
    }
  }

  return tempWalletContent
}