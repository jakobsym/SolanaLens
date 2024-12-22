import { fetchTokenHolders, fetchTokenPrice, fetchTokenFDV } from "../utils/helius.js"
import 'dotenv/config'
import {fetchProgramAddress, fetchTokenAge, fetchTokenMetadata, fetchTokenSupply } from "../utils/rpc.js"

const tokenRoutes = (fastify, options) => {
    // enter CA and in return you get

    /* 
        price(usd) (DONE)
        FDV (DONE)
        pair age (1/2 DONE)
        total holders (DONE)
        liq ()
        24h volume ()
        % gain over 1H ()
    */

    // market cap, pair age, 
    fastify.get('/:tokenAddress', async(req, res) => {
        try {
            const tokenAddressObj = req.params
            //const holderAmount = await fetchTokenHolders(tokenAddressObj)
            //const tokenPrice = await fetchTokenPrice(tokenAddressObj);
            //const tokenProgramAddress = await fetchProgramAddress(tokenAddressObj)
            //const metadata = await fetchTokenMetadata(tokenAddressObj);
            //const supply = await fetchTokenSupply(tokenAddressObj);
            //const tokenFDV = fetchTokenFDV(tokenPrice, supply)
            //const twitterUrl = fetchSocials(tokenAddressObj);
            
            // this does not work
            const transactions = await fetchTokenAge(tokenAddressObj);
            res.code(200).header('Content-Type', 'application/json').send(transactions)
        } catch (error) {
            fastify.log.error({error, params: req.params}, 'Error in Token route')
            res.code(500).send({error: 'Unexpected error occurred'})
        }
    })

    // top 10 holders
    
}

export default tokenRoutes