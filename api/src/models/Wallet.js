import { Token } from './Tokens.js'
/*
walletAddress: String
tokens: Token
*/
export default class Wallet {
    constructor(walletAddress, tokens = []) {
        this.walletAddress = walletAddress
        this.tokens = tokens.map(
            token => new Token(token.token_address, token.amount)
        )
    }
}
