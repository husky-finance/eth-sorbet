import { ethers } from 'ethers'

export type Config = {
  targetNetwork: Network
  open: boolean
  handleClose: Function

  // [Optional]
  // wheather to check user's balance on the target network
  checkBalance?: boolean
  // user's address to check
  address?: string
  // // Type of L1 token to deposit to L2
  // depositToken: string
  // // Amount of L1 token to deposit to L2
  // depositAmount: string
  // L1 Network
  l1chainId: number

  // Dapp name
  dappName: string
  dappLogo?: string

  darkMode?: boolean
}

export type Network = {
  name: string
  rpcUrls: string[]
  chainId: number
  nativeCurrency?: {
    symbol: string
    name: string
    decimals: number
  }
  blockExplorerUrl?: string
  img?: string
  bridgeUrl?: string
  depositNativeToken?: (
    provider: any,
    amount: string,
    sender: string
  ) => Promise<void>
}

export interface WindowChain {
  ethereum?: ethers.providers.ExternalProvider
}
