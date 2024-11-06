import Wallet from '../models/Wallet.js'
import {fetchWalletContent} from '../utils/helius.js'
const walletRoutes = (fastify, options) => {
    
    //TODO: Create a validation function on param
    fastify.get('/:walletAddress', async(req, res) => {
        try {
            const walletAddress = req.params
            const tokens = fetchWalletContent(walletAddress)
            var wallet = new Wallet(walletAddress, tokens)         
            // TODO: before wallet of tokens gets sent back to user
            //      the amounts of each token need to be cleaned   
            res.code(200).header('Content-Type', 'application/json').send(wallet)
        } catch (error) {
            fastify.log.error({error, params: req.params}, 'Error in wallet route')
            res.code(500).send({error: 'Unexpected error occurred'})
        }
    })
}

export default walletRoutes;