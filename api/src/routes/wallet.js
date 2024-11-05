import Wallet from '../models/Wallet.js'
import {fetchWalletContent} from '../utils/helius.js'
const walletRoutes = (fastify, options) => {
    
    // call fetchWalletContent from helius.js
    // middleware will clean the amount 
    // before it gets sent to client as JSON
    //TODO: Create a validation function on param
    fastify.get('/:walletAddress', async(req, res) => {
        try {
            const walletAddress = req.params
            const tokens = fetchWalletContent(walletAddress)
            var wallet = new Wallet(walletAddress, tokens)            
            res
                .code(200)
                .header()
                .send(wallet)
        } catch (error) {
            
        }


        return wallet
    })



}

export default walletRoutes;