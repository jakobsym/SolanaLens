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
    })

    // top 10 holders
    
}

export default tokenRoutes