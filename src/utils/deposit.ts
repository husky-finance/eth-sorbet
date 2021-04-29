import { ethers } from 'ethers'

import { abis, addresses } from '../contracts'

export async function depositArbitrumTestnet(
  externalProvider: ethers.providers.ExternalProvider,
  amount: string,
  sender: string
) {
  const provider = new ethers.providers.Web3Provider(externalProvider)
  const contract = new ethers.Contract(
    addresses.addressArbitrumKovan4,
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
    addresses.addressOptimismKovan2,
    abis.abiOptimismKovan2,
    provider.getSigner()
  )
  await contract.deposit({
    from: sender,
    value: amount
  })
}

export async function depositSkaleTestnet(
  externalProvider: ethers.providers.ExternalProvider,
  amount: string,
  sender: string
) {
  const provider = new ethers.providers.Web3Provider(externalProvider)
  const contract = new ethers.Contract(
    addresses.addressSkaleRinkeby,
    abis.abiSkaleRinkeby,
    provider.getSigner()
  )
  await contract.deposit(
    '344435',
    sender,
    ethers.utils.toUtf8Bytes('[Test Message]'),
    {
      from: sender,
      value: amount
    }
  )
}
