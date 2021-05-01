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

  l1chainId?: number

  blockExplorerUrl?: string
  img?: string
  bridgeUrl?: string

  // deposit function
  depositNativeToken?: (
    provider: any,
    amount: string,
    sender: string
  ) => Promise<void>

  depositToken?: (
    provider: any,
    token: string,
    amount: string,
    sender: string
  ) => Promise<void>
}

export interface WindowChain {
  ethereum?: ethers.providers.ExternalProvider
}
