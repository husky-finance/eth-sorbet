import { ethers } from 'ethers'

import { abis, addresses } from '../contracts'

export async function depositArbitrumTestnet(
  externalProvider: ethers.providers.ExternalProvider,
  amount: string,
  sender: string
) {
  const provider = new ethers.providers.Web3Provider(externalProvider)
  const contract = new ethers.Contract(
    addresses.arbitrumBridgeKovan4,
    abis.abiArbitrumKovan4,
    provider.getSigner()
  )
  await contract.depositEth(sender, {
    value: amount,
    from: sender
  })
}

export async function depositOptimismTestnet(
  externalProvider: ethers.providers.ExternalProvider,
  amount: string,
  sender: string
) {
  const provider = new ethers.providers.Web3Provider(externalProvider)
  const contract = new ethers.Contract(
    addresses.optimismBridgeKovan2,
    abis.abiOptimismKovan2,
    provider.getSigner()
  )
  await contract.deposit({
    from: sender,
    value: amount
  })
}

// todo: merge depositETHMatic & depositETHMaticTestnet
export async function depositETHMatic(
  externalProvider: ethers.providers.ExternalProvider,
  amount: string,
  sender: string
) {
  const provider = new ethers.providers.Web3Provider(externalProvider)
  const contract = new ethers.Contract(
    addresses.maticBridge,
    abis.abiMaticMumbai,
    provider.getSigner()
  )
  await contract.depositEtherFor(sender, {
    from: sender,
    value: amount
  })
}

export async function depositETHMaticTestnet(
  externalProvider: ethers.providers.ExternalProvider,
  amount: string,
  sender: string
) {
  const provider = new ethers.providers.Web3Provider(externalProvider)
  const contract = new ethers.Contract(
    addresses.maticBridge,
    abis.abiMaticMumbai,
    provider.getSigner()
  )
  await contract.depositEtherFor(sender, {
    from: sender,
    value: amount
  })
}

export async function depositTokenMaticTestnet(
  externalProvider: ethers.providers.ExternalProvider,
  token: string,
  amount: string,
  sender: string
) {
  const provider = new ethers.providers.Web3Provider(externalProvider)
  const contract = new ethers.Contract(
    addresses.maticBridgeMumbai,
    abis.abiMaticMumbai,
    provider.getSigner()
  )
  // this is wrong
  const depositData = amount
  await contract.depositFor(sender, token, depositData, {
    from: sender
  })
}
