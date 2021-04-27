import { ethers } from 'ethers'

import { abis, addresses } from '../contracts'

export async function depositArbitrumTestnet(
  externaPprovider: ethers.providers.ExternalProvider,
  amount: string,
  sender: string
  // token: string,
) {
  const provider = new ethers.providers.Web3Provider(externaPprovider)
  const contract = new ethers.Contract(
    addresses.addressArbitrumKovan4,
    abis.abiArbitrumKovan4,
    provider.getSigner()
  )
  await contract.depositEth(sender, {
    value: ethers.utils.parseEther(amount),
    from: sender
  })
}

export async function depositOptimismTestnet(
  externaPprovider: ethers.providers.ExternalProvider,
  amount: string,
  sender: string
  // token: string
) {
  const provider = new ethers.providers.Web3Provider(externaPprovider)
  const contract = new ethers.Contract(
    addresses.addressOptimismKovan2,
    abis.abiOptimismKovan2,
    provider.getSigner()
  )
  await contract.deposit({
    from: sender,
    value: ethers.utils.parseEther(amount)
  })
}
