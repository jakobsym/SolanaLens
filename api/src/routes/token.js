import { fetchTokenHolders, fetchTokenPrice, fetchTokenFDV } from "../utils/helius.js"
import 'dotenv/config'
import {fetchProgramAddress, fetchTokenMetadata } from "../utils/rpc.js"

const tokenRoutes = (fastify, options) => {

    // enter CA and in return you get
    /* 
        price(usd) (DONE)
        FDV (WIP)
        liq
        24h volume
        pair age
        % gain over 1H
        total holders (DONE)
    */
    // market cap, pair age, 
    fastify.get('/:tokenAddress', async(req, res) => {
        try {
            const tokenAddressObj = req.params
            //const holderAmount = await fetchTokenHolders(tokenAddressObj)
            //const tokenPrice = await fetchTokenPrice(tokenAddressObj);
            const tokenProgramAddress = await fetchProgramAddress(tokenAddressObj)
            const metadata = await fetchTokenMetadata(tokenProgramAddress);
            res.code(200).header('Content-Type', 'application/json').send(metadata)
        } catch (error) {
            fastify.log.error({error, params: req.params}, 'Error in Token route')
            res.code(500).send({error: 'Unexpected error occurred'})
        }
    })

    // top 10 holders
    
}

export default tokenRoutes