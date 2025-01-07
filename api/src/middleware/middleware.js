// Returns a String representation twitter search of token address
export const fetchSocials = (tokenAddress) => {
    let twitterUrl = "https://x.com/search?q="
    return twitterUrl+=tokenAddress
}

// Returns a String representation of a tokens address
export const createTokenAddress = (tokenAddressObj) => {
    return tokenAddressObj.tokenAddress;
}
// Returns a String representation of a wallet address
export const createWalletAddress = (walletAddressObj) => { 
    return walletAddressObj.walletAddress;
}