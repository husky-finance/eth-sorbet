import { ethers } from 'ethers'
import { Config } from '../types'

/**
 * use `wallet_addEthereumChain` call to request a network switch.
 * @param provider
 * @param config
 * @returns {boolean} success or not
 */
export async function switchNetwork(
  provider: ethers.providers.ExternalProvider,
  config: Config
): Promise<boolean> {
  // switch network
  const network = config.targetNetwork
  try {
    if (!provider.request) {
      throw new Error('Invalid Wallet Provider. provider.request is undefined')
    }
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: `0x${network.chainId.toString(16)}`,
          chainName: network.name,
          nativeCurrency: network.nativeCurrency,
          rpcUrls: network.rpcUrls,
          blockExplorerUrls: [network.blockExplorerUrl]
        }
      ]
    })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
