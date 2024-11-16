import { fetchTokenHolders } from "../utils/helius.js"


const tokenRoutes = (fastify, options) => {

    // enter CA and in return you get
    /* 
        price(usd)
        FDV
        liq
        24h volume
        pair age
        % gain over 1H
        total holders
    */
    // market cap, pair age, 
    fastify.get('/:tokenAddress', async(req, res) => {
        try {
            const tokenAddressObj = req.params
            const holders = await fetchTokenHolders(tokenAddressObj)
            console.log(holders)
            res.code(200).header('Content-Type', 'application/json').send(holders)
        } catch (error) {
            fastify.log.error({error, params: req.params}, 'Error in Token route')
            res.code(500).send({error: 'Unexpected error occurred'})
        }
    })

    // top 10 holders
    
}

export default tokenRoutes