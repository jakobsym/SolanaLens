import { Helius } from "helius-sdk"
import 'dotenv/config'

const helius = new Helius(process.env.HELIUS_API_KEY)

const response = await helius.rpc.getTokenAccounts({
  page: 1,
  limit: 100,
  options: {
    showZeroBalance: false,
  },
  owner: "3kYg4HFn9PFG3PBUjSsuCEiZb3zDxnrbuQQnY1iUjy5f"
});

console.log(response)
