const walletRoutes = (fastify, options) => {
    
    // call fetchWalletContent from helius.js
    // middleware will clean the amount 
    // before it gets sent to client as JSON
    fastify.get('/:walletAddress', async(req, res) => {
    })



}

export default walletRoutes;