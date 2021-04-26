import { ethers } from 'ethers'

export type Config = {
  targetNetwork: Network

  // [Optional]
  // wheather to check user's balance on the target network
  checkBalance?: boolean
  // user's address to check
  address?: string
  open: boolean
  handleClose: Function
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

export interface WindowChain {
  ethereum?: ethers.providers.ExternalProvider
}
