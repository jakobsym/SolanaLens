import 'dotenv/config'
import { createTokenAddress, fetchSocials } from '../middleware/middleware.js'
import { fetchTokenHolderAmount, fetchTokenPrice, fetchTokenFDV } from "../utils/helius.js"
import {fetchTokenAge, fetchNameAndSymbol } from "../utils/rpc.js"
import { Response } from '../models/Response.js'

const tokenRoutes = (fastify, options) => {

    /* 
        LP Burned?
        Mint Auth on/off

        // These are large WIP
        liq ()
        24h volume ()
        % gain over 1   H ()
    */ 
    
    fastify.get('/:tokenAddress', async(req, res) => {
        const tokenAddress = createTokenAddress(req.params)
        try {
            const holders = await fetchTokenHolderAmount(tokenAddress)
            const price = await fetchTokenPrice(tokenAddress);
            const age = await fetchTokenAge(tokenAddress);
            const fdv = await fetchTokenFDV(price, tokenAddress)
            const [name, symbol] = await fetchNameAndSymbol(tokenAddress);
            const socials = fetchSocials(tokenAddress);
    
            await Promise.allSettled([holders, price, age, fdv, name, symbol])
            const response = new Response(symbol, name, fdv, price, age, holders, socials)
        
            //const tokenProgramAddress = await fetchProgramAddress(tokenAddress)
            //const metadata = await fetchTokenMetadata(tokenAddress);
            //const supply = await fetchTokenSupply(tokenAddress);
            res.header('x-api-version', 'v0');
            res.code(200).header('Content-Type', 'application/json').send(response)
        } catch (error) {
            fastify.log.error({error, params: req.params}, 'Error in Token route')
            res.code(500).send({error: 'Unexpected error occurred'})
        }
    })
}

export default tokenRoutes