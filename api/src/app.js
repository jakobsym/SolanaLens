//import { fetchWalletContent } from './utils/helius.js'
import Fastify from 'fastify'
import telegramRateLimiter from './utils/rate_limit.js'
import walletRoutes from './routes/wallet.js'
import tokenRoutes from './routes/token.js'
import 'dotenv/config'

const Server = async() => {
  const fastify = Fastify({
    logger: true
  })

  fastify.register(walletRoutes, {prefix: '/v0/wallet'})
  
  fastify.register(async(instance) => {
    instance.register(telegramRateLimiter)
    instance.register(tokenRoutes)
  }, {prefix: '/v0/token'});

  fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
  })
}

Server()