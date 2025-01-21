const fastify = require('fastify')()

const insertNewToken = async(tokenAddress, symbol, holders) => {
    try {
        const query = `INSERT INTO tokens (token_address, token_symbol, holder_amount) VALUES($1, $2, $3) RETURNING *;`
        const result = await fastify.pg.query( query, [tokenAddress, symbol, holders])
        return result.rows[0]
    } catch(error) {
        console.error('psql operation error', error)
        throw error
    }
}

const queryHolderAmount = async(tokenAddress) => {
    try {
        const query = `SELECT holder_amount FROM tokens WHERE token_address=$1;`
        const result = await fastify.pg.query(query, [tokenAddress])
        if (result.rows[0]?.holder_amount != undefined) {
            return result.rows[0].holder_amount
        } else {
            return -1
        }
    } catch(error) {
        console.error('psql operation error', error)
        throw error
    }
}


const queryToken = async(tokenAddress) => {
    try {
        const query = `SELECT `

    } catch(error) {
        console.error('psql operatione error', error)
    }
}

const deleteToken = async(tokenAddress) => {

}


// 
const updateHolderAmount = async(tokenAddress) => {

}