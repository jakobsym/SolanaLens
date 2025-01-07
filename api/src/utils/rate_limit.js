class TokenBucket {
    constructor(tokenCapactity, refilRate) {
        this.tokenCapactity = tokenCapactity
        this.refilRate = refilRate

        this.tokens = tokenCapactity // cur # of tokens in bucket
        this.lastRefillTime = Date.now();
    }

    refil() {
        // time since last refil
        const now = Date.now()
        const timePassed = (now - this.lastRefillTime) / 1000
        const tokensToAdd = timePassed * this.refilRate

        this.tokens = Math.min(this.tokenCapactity, this.tokens + tokensToAdd)
        
        // update time
        this.lastRefillTime = now
    }

    tryConsume() {
        // refil before consume
        this.refil()

        if (this.tokens >= 1) {
            this.tokens -= 1
            return true
        }
        return false
    }
    /*
    WIP
    // `userBuckets`: Map<string, TokenBucket>
    cleanBuckets(userBuckets) {
        const now = Date.now()
        for(const [userId, bucket] of userBuckets.entries()) {
            if(now - bucket.lastRefillTime > 60 * 60 * 1000) {
                userBuckets.delete(userId)
            }
        }
    }
    */

}

async function telegramRateLimiter(fastify, options) {
    const userBuckets = new Map() // userId is mapped to a TokenBucket
    fastify.addHook('onRequest', (request, reply, done) => {
        const userId = "123" /* determine how userId is sent to server from bot via `request` */
        
        if (!userId) {
            reply.code(400).send({error: "Missing telegram userId"})
        }

        if(!userBuckets.has(userId)) {
            userBuckets.set(userId, new TokenBucket(60, 1))
        }

        const bucket = userBuckets.get(userId)

        if (!bucket.tryConsume()) {
            reply.code(429),send({error: "Too many requests"})
        }
    })
}

export default telegramRateLimiter