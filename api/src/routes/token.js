import { fetchTokenHolders, fetchTokenPrice, fetchTokenFDV } from "../utils/helius.js"
import 'dotenv/config'
import {fetchLiqAndAge, fetchProgramAddress, fetchTokenMetadata, fetchTokenSupply } from "../utils/rpc.js"

const tokenRoutes = (fastify, options) => {

    // enter CA and in return you get
    /* 
        price(usd) (DONE)
        FDV (DONE)
        liq
        24h volume
        % gain over 1H
        pair age
        total holders (DONE)
    */
    // market cap, pair age, 
    fastify.get('/:tokenAddress', async(req, res) => {
        try {
            const tokenAddressObj = req.params
            //const holderAmount = await fetchTokenHolders(tokenAddressObj)
            //const tokenPrice = await fetchTokenPrice(tokenAddressObj);
            //const tokenProgramAddress = await fetchProgramAddress(tokenAddressObj)
            //const metadata = await fetchTokenMetadata(tokenProgramAddress);
            //const supply = await fetchTokenSupply(tokenAddressObj);
            //const tokenFDV = fetchTokenFDV(tokenPrice, supply)
            //const twitterUrl = fetchSocials(tokenAddressObj);
            res.code(200).header('Content-Type', 'application/json').send(twitterUrl)
        } catch (error) {
            fastify.log.error({error, params: req.params}, 'Error in Token route')
            res.code(500).send({error: 'Unexpected error occurred'})
        }
    })

    // top 10 holders
    
}

export default tokenRoutes