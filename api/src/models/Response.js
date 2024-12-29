/* 
// TODO: Add 'holders' && rename class to `TokenResponse`
*/
export class Response{
    constructor(symbol, name, fdv, price, age, holders, socials) {
        this.symbol = symbol
        this.name = name
        this.fdv = fdv
        this.price = price
        this.age = age
        this.holders = holders
        this.socials = socials
    }
}