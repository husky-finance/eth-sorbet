import { web3Provider, Config } from '../types'

/**
 * use `wallet_addEthereumChain` call to request a network switch.
 * @param provider
 * @param config
 * @returns {boolean} success or not
 */
export async function switchNetwork(
  provider: web3Provider,
  config: Config
): Promise<boolean> {
  // switch network
  const network = config.targetNetwork
  try {
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
