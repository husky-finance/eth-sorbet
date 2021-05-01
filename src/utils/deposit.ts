import { ethers } from 'ethers'

import { abis, addresses } from '../contracts'

export async function depositArbitrumTestnet(
  externalProvider: ethers.providers.ExternalProvider,
  amount: string,
  sender: string,
  callback?: Function
) {
  const provider = new ethers.providers.Web3Provider(externalProvider)
  const contract = new ethers.Contract(
    addresses.arbitrumBridgeKovan4,
    abis.abiArbitrumKovan4,
    provider.getSigner()
  )
  const { hash } = await contract.depositEth(sender, {
    value: amount,
    from: sender
  })

  if (typeof callback === 'function') provider.once(hash, () => callback())
}

export async function depositOptimismTestnet(
  externalProvider: ethers.providers.ExternalProvider,
  amount: string,
  sender: string,
  callback?: Function
) {
  const provider = new ethers.providers.Web3Provider(externalProvider)
  const contract = new ethers.Contract(
    addresses.optimismBridgeKovan2,
    abis.abiOptimismKovan2,
    provider.getSigner()
  )
  const { hash } = await contract.deposit({
    from: sender,
    value: amount
  })

  if (typeof callback === 'function') provider.once(hash, () => callback())
}

// todo: merge depositETHMatic & depositETHMaticTestnet
export async function depositETHMatic(
  externalProvider: ethers.providers.ExternalProvider,
  amount: string,
  sender: string,
  callback?: Function
) {
  const provider = new ethers.providers.Web3Provider(externalProvider)
  const contract = new ethers.Contract(
    addresses.maticBridge,
    abis.abiMaticMumbai,
    provider.getSigner()
  )
  const { hash } = await contract.depositEtherFor(sender, {
    from: sender,
    value: amount
  })

  if (typeof callback === 'function') provider.once(hash, () => callback())
}

export async function depositETHMaticTestnet(
  externalProvider: ethers.providers.ExternalProvider,
  amount: string,
  sender: string,
  callback?: Function
) {
  const provider = new ethers.providers.Web3Provider(externalProvider)
  const contract = new ethers.Contract(
    addresses.maticBridge,
    abis.abiMaticMumbai,
    provider.getSigner()
  )
  const { hash } = await contract.depositEtherFor(sender, {
    from: sender,
    value: amount
  })

  if (typeof callback === 'function') provider.once(hash, () => callback())
}

export async function depositTokenMatic(
  externalProvider: ethers.providers.ExternalProvider,
  token: string,
  amount: string,
  sender: string,
  callback?: Function
) {
  const provider = new ethers.providers.Web3Provider(externalProvider)
  const contract = new ethers.Contract(
    addresses.maticBridge,
    abis.abiMaticMumbai,
    provider.getSigner()
  )
  const coder = new ethers.utils.AbiCoder()
  const depositData = coder.encode(['uint256'], [amount])
  const { hash } = await contract.depositFor(sender, token, depositData, {
    from: sender
  })

  if (typeof callback === 'function') provider.once(hash, () => callback())
}

export async function depositTokenMaticTestnet(
  externalProvider: ethers.providers.ExternalProvider,
  token: string,
  amount: string,
  sender: string,
  callback?: Function
) {
  const provider = new ethers.providers.Web3Provider(externalProvider)
  const contract = new ethers.Contract(
    addresses.maticBridgeMumbai,
    abis.abiMaticMumbai,
    provider.getSigner()
  )
  const coder = new ethers.utils.AbiCoder()
  const depositData = coder.encode(['uint256'], [amount])
  const { hash } = await contract.depositFor(sender, token, depositData, {
    from: sender
  })

  if (typeof callback === 'function') provider.once(hash, () => callback())
}
