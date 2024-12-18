/*
- Various formatting functions will live here
*/
const formatTokenAmount = (tokens) => {
    var tmpTokens = []

    tokens.forEach(token => {
        const tmpToken = token.amount / 1000000
        const fmtToken = tmpToken.toLocaleString('en-US', {
            minimumFractionDigits: 6,
            maximumFractionDigits: 6
        })

        tmpTokens.push({
            "token_address": token.token_address,
            "amount": fmtToken
        })
    });

    return tmpTokens
}


export const formatSupply = (supply) => {
    
    
}
export default formatTokenAmount