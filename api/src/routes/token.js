import 'dotenv/config'
import { createTokenAddress, fetchSocials } from '../middleware/middleware.js'
import { fetchTokenHolderAmount, fetchTokenPrice, fetchTokenFDV, fetchTokenLiquidity  } from "../utils/helius.js"
import {fetchProgramAddress, fetchTokenAge, fetchTokenMetadata, fetchTokenSupply } from "../utils/rpc.js"
import { Response } from '../models/Response.js'
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
        % gain over 1   H ()
    */ 
   // TODO: Fix `holders`
    fastify.get('/:tokenAddress', async(req, res) => {
        const tokenAddress = createTokenAddress(req.params)
        try {
            const holders = await fetchTokenHolders(tokenAddress)
            
            /*
            const price = await fetchTokenPrice(tokenAddress);
            const age = await fetchTokenAge(tokenAddress);
            const fdv = await fetchTokenFDV(price, tokenAddress)
            const socials = fetchSocials(tokenAddress);    

            await Promise.allSettled([price, age, fdv])
            const response = new Response(price, fdv, age, socials)
            */
            //const tokenProgramAddress = await fetchProgramAddress(tokenAddress)
            //const metadata = await fetchTokenMetadata(tokenAddress);
            //const supply = await fetchTokenSupply(tokenAddress);
            res.code(200).header('Content-Type', 'application/json').send(holders)
        } catch (error) {
            fastify.log.error({error, params: req.params}, 'Error in Token route')
            res.code(500).send({error: 'Unexpected error occurred'})
        }
    })
}

export default tokenRoutes