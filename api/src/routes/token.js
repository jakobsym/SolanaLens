import 'dotenv/config'
import { createTokenAddress, fetchSocials } from '../middleware/middleware.js'
import { fetchTokenHolders, fetchTokenPrice, fetchTokenFDV, fetchTokenLiquidity  } from "../utils/helius.js"
import {fetchProgramAddress, fetchTokenAge, fetchTokenMetadata, fetchTokenSupply } from "../utils/rpc.js"

const tokenRoutes = (fastify, options) => {
    // enter CA and in return you get

    /* 
        price(usd) (DONE)
        FDV (DONE)
        pair age (1/2 DONE)
        total holders (DONE)
        LP Burned?
        Mint Auth on/off

        // These are large WIP
        liq ()
        24h volume ()
        % gain over 1H ()
    */

    // market cap, pair age, 
    fastify.get('/:tokenAddress', async(req, res) => {
        const tokenAddress = createTokenAddress(req.params)
        try {
            //const holderAmount = await fetchTokenHolders(tokenAddressObj)
            //const tokenPrice = await fetchTokenPrice(tokenAddressObj);
            //const tokenProgramAddress = await fetchProgramAddress(tokenAddressObj)
            //const metadata = await fetchTokenMetadata(tokenAddressObj);
            //const supply = await fetchTokenSupply(tokenAddressObj);
            //const tokenFDV = fetchTokenFDV(tokenPrice, supply)
            const twitterUrl = fetchSocials(tokenAddress);    
            //const age = await fetchTokenAge(tokenAddressObj);
            
            res.code(200).header('Content-Type', 'application/json').send(twitterUrl)
        } catch (error) {
            fastify.log.error({error, params: req.params}, 'Error in Token route')
            res.code(500).send({error: 'Unexpected error occurred'})
        }
    })

    // top 10 holders
    
}

export default tokenRoutes