import Wallet from '../models/Wallet.js'
import fetchWalletContent from '../utils/helius.js'
import formatTokenAmount from '../middleware/format.js'

const walletRoutes = (fastify, options) => {
    
    //TODO: Create a validation function on param
    fastify.get('/:walletAddress', async(req, res) => {
        try {
            const walletAddressObj = req.params
            const tokens = await fetchWalletContent(walletAddressObj)
            var wallet = new Wallet(walletAddressObj.walletAddress, formatTokenAmount(tokens))          
            res.code(200).header('Content-Type', 'application/json').send(wallet)
        } catch (error) {
            fastify.log.error({error, params: req.params}, 'Error in wallet route')
            res.code(500).send({error: 'Unexpected error occurred'})
        }
    })
}

export default walletRoutes;