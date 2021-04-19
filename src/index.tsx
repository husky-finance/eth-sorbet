// import * as React from 'react'
// import styles from './styles.module.css'
import type { Config, WindowChain } from './types'
import { providers } from 'ethers'
// export all default networks
export * from './constant/networks'

// interface Props {
//   text: string
// }

// export const ExampleComponent = ({ text }: Props) => {
//   return <div className={styles.test}>Example Component : {text}</div>
// }

// export const LetsGo = () => {
class LetsGo {
  // what network is the app on
  config: Config
  provider: WindowChain['ethereum']

  constructor(config: Config) {
    this.config = config
    const provider = (window as WindowChain).ethereum
    if (!provider || !provider.request) {
      throw new Error("Can't setup get Provider. window.ethereum is undefined")
    } else {
      this.provider = provider
    }
  }

  async setupNetwork() {
    // 1. check balance and pop notification
    await this.checkTargetNetworkBalance()

    // 2. add a sugest user to switch network
    await this.switchNetwork()
  }

  async checkTargetNetworkBalance() {
    // skill the check if not configed
    if (!this.config.address || !this.config.checkBalance) return
    const rpcProvider = new providers.JsonRpcProvider(
      this.config.targetNetwork.rpcUrls[0]
    )
    const balance = await rpcProvider.getBalance(this.config.address)
    console.log(`balance`, balance.toString())

    if (balance.isZero()) {
      // Todo: handle user have no L2 balance
    }
  }

  async switchNetwork() {
    if (!this.provider) {
      console.error(
        "Can't setup the network on metamask because window.ethereum is undefined"
      )
      return false
    }
    // switch network
    const network = this.config.targetNetwork
    try {
      await this.provider.request({
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
}

export default LetsGo
