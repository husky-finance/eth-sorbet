export type Config = {
  targetNetwork: Network

  // [Optional]
  // wheather to check user's balance on the target network
  checkBalance?: boolean
  // user's address to check
  address?: string
}

export type Network = {
  name: string
  rpcUrls: string[]
  chainId: number
  nativeCurrency?: {
    symbol: string
    name: string
    decimals: 18
  }
  blockExplorerUrl?: string
}

export interface web3Provider {
  isMetaMask?: true
  request: (...args: any[]) => any
}

export interface WindowChain {
  ethereum?: web3Provider
}
