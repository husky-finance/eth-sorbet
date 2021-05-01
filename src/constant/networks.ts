import { Network } from '../types'
import * as depositUtil from '../utils/deposit'

// TODO probably a good idea to combine this with rest of chains below
export const ethChains = {
  1: 'Mainnet',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Goerli',
  42: 'Kovan'
}

// sorted by chainId
export const Binance: Network = {
  name: 'Binance Smart Chain',
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrl: 'https://bscscan.com',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'bnb',
    decimals: 18
  },
  chainId: 56,
  img: 'https://i.imgur.com/Jcs4TTC.png',
  bridgeUrl: 'https://www.binance.org/en/bridge'
}

export const xDai: Network = {
  name: 'xDai',
  rpcUrls: ['https://rpc.xdaichain.com/'],
  blockExplorerUrl: 'https://blockscout.com/xdai/mainnet',
  nativeCurrency: {
    name: 'xDai',
    symbol: 'xDai',
    decimals: 18
  },
  chainId: 100,
  img: 'https://i.imgur.com/qDNpwXw.png',
  bridgeUrl: 'https://bridge.xdaichain.com/'
}

export const Sokol: Network = {
  name: 'Sokol',
  rpcUrls: ['https://sokol.poa.network/'],
  blockExplorerUrl: 'https://blockscout.com/poa/sokol',
  nativeCurrency: {
    name: 'SPOA',
    symbol: 'SPOA',
    decimals: 18
  },
  chainId: 77
}

export const MaticTestnet: Network = {
  name: 'Matic - Mumbai Testnet',
  rpcUrls: ['https://rpc-mumbai.matic.today'],
  blockExplorerUrl: 'https://mumbai-explorer.matic.today',
  nativeCurrency: {
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18
  },
  chainId: 80001,
  img: 'https://i.imgur.com/RNmUy9P.png',
  bridgeUrl: 'https://wallet.matic.network/bridge/',

  l1chainId: 5, // Goerli
  depositNativeToken: depositUtil.depositETHMaticTestnet,
  depositToken: depositUtil.depositTokenMaticTestnet
}

export const Matic: Network = {
  name: 'Matic',
  rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
  blockExplorerUrl: 'https://explorer.matic.network/',
  nativeCurrency: {
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18
  },
  chainId: 137,
  img: 'https://i.imgur.com/RNmUy9P.png',
  bridgeUrl: 'https://wallet.matic.network/bridge/',

  l1chainId: 1,
  depositNativeToken: depositUtil.depositETHMatic
}

export const Avalanche: Network = {
  name: 'Avalanche Mainnet C-Chain',
  chainId: 43114,
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrl: 'https://cchain.explorer.avax.network/',
  img: 'https://i.imgur.com/5mLLDbu.png',
  bridgeUrl: 'https://aeb.xyz/#/transfer'
}

export const SKALE: Network = {
  name: 'SKALE Network - Testnet',
  chainId: 344435,
  nativeCurrency: {
    name: 'SKALE ETH',
    symbol: 'skETH',
    decimals: 18
  },
  rpcUrls: ['https://dev-testnet-v1-0.skalelabs.com'],
  blockExplorerUrl:
    'https://expedition.dev/?rpcUrl=https://dev-testnet-v1-0.skalelabs.com',
  img: 'https://i.imgur.com/0lfRFet.png'
}

export const ArbitrumTestnet: Network = {
  name: 'Arbitrum - Kovan',
  rpcUrls: ['https://kovan4.arbitrum.io/rpc'],
  blockExplorerUrl: 'https://explorer.arbitrum.io/#/',
  chainId: 212984383488152,
  img: 'https://i.imgur.com/QJOromM.png',
  bridgeUrl: 'https://bridge.arbitrum.io/',

  l1chainId: 42,
  depositNativeToken: depositUtil.depositArbitrumTestnet
}

export const OptimismTestnet: Network = {
  name: 'Optimism - Kovan',
  rpcUrls: ['https://kovan.optimism.io'],
  blockExplorerUrl: 'https://kovan-l2-explorer.surge.sh',
  chainId: 69,
  img: 'https://i.imgur.com/qHBFlSq.png',

  l1chainId: 42,
  depositNativeToken: depositUtil.depositOptimismTestnet
}

export const OptimismMainnet: Network = {
  name: 'Optimism - Mainnet',
  rpcUrls: ['https://mainnet.optimism.io'],
  blockExplorerUrl: 'https://mainnet-l2-explorer.surge.sh',
  chainId: 10,
  img: 'https://i.imgur.com/qHBFlSq.png'
}
