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

  // which network should user depoist from
  l1chainId?: number

  // native token on the L1. (use undefined for ETH)
  l1Token?: {
    address: string
    symbol: string
    decimals: number
    spender: string
  }

  blockExplorerUrl?: string
  img?: string
  bridgeUrl?: string

  // deposit function
  depositETH?: (
    provider: any,
    amount: string,
    sender: string,
    callback?: Function
  ) => Promise<void>

  depositToken?: (
    provider: any,
    token: string,
    amount: string,
    sender: string,
    callback?: Function
  ) => Promise<void>
}

export interface WindowChain {
  ethereum?: ethers.providers.ExternalProvider
}
