import { Token } from './Tokens'
/*
walletAddress: String
tokens: Token
*/
export default class Wallet {
    constructor(walletAddress, tokens = []) {
        this.walletAddress = walletAddress
        this.tokens = tokens.map(
            token => new Token(token.tokenAddress, token.amount)
        )
    }
}
