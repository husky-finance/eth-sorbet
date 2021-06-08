import React, { useEffect, useState, useCallback } from 'react'
import {
  Sorbet,
  Binance,
  ArbitrumTestnet,
  OptimismTestnet,
  OptimismMainnet,
  xDai,
  Avalanche,
  MaticTestnet,
  Matic,
  Config
} from '@huskyfinance/eth-sorbet'
import { WindowChain } from '../../src/types'

// WalletConnect Client
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'

// WalletConnect Web3
import WalletConnectProvider from '@walletconnect/web3-provider'
// import { providers } from 'ethers'

const networks = [
  Binance,
  ArbitrumTestnet,
  OptimismTestnet,
  OptimismMainnet,
  xDai,
  Avalanche,
  MaticTestnet,
  Matic
]
// const ran = parseInt((Math.random() * networks.length).toFixed(0))
// const idx = ran === 0 ? ran : ran - 1
const idx = 1

const App = () => {
  const [open, setOpen] = useState(false)
  const [userAddress, setUserAddress] = useState('')

  const [provider, setProvider] = useState<any>(null)

  useEffect(() => {
    const fetchData = async (provider: any) => {
      let accounts
      if (provider.accounts) {
        accounts = provider.accounts
      } else {
        accounts = await provider.request({
          method: 'eth_requestAccounts'
        })
      }
      const account = accounts[0]
      setUserAddress(account)
    }

    if (!provider || !provider.request) {
      const errorMessage = 'Please connect wallet first'
      setUserAddress(errorMessage)
    } else {
      fetchData(provider)

      // TODO: What is best way to identify if provider is WalletConnect
      if (provider.bridge) {
        // Subscribe to accounts change
        provider.on('accountsChanged', (accounts: string[]) => {
          console.log(accounts)
        })
        // Subscribe to chainId change
        provider.on('chainChanged', (chainId: number) => {
          console.log(chainId)
        })
        // Subscribe to session disconnection
        provider.on('disconnect', (code: number, reason: string) => {
          console.log(code, reason)
        })
      }
    }
  }, [provider])

  const connectMetamask = useCallback(() => {
    setProvider((window as WindowChain).ethereum)
  }, [])

  const providerWalletConnect = new WalletConnectProvider({
    infuraId: process.env.REACT_APP_INFURA_ID
    // rpc: {
    //   1: 'https://mainnet.mycustomnode.com',
    //   3: 'https://ropsten.mycustomnode.com',
    //   100: 'https://dai.poa.network'
    //   // ...
    // }
  })

  const connectWalletConnectWeb3 = useCallback(async () => {
    await providerWalletConnect.enable()
    setProvider(providerWalletConnect)

    //  Wrap with Web3Provider from ethers.js
    // const web3Provider = new providers.Web3Provider(providerWalletConnect)
    // let balance = await web3Provider.getBalance('ethers.eth')
    // console.log('balance: ', balance)
    // console.log('network: ', await web3Provider.getNetwork())
  }, [providerWalletConnect])

  const connectWalletConnectClient = useCallback(() => {
    // Create a connector
    const connector = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org', // Required
      qrcodeModal: QRCodeModal
    })

    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      connector.createSession()
    }

    // Subscribe to connection events
    connector.on('connect', (error, payload) => {
      if (error) {
        throw error
      }

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0]
      console.log(chainId)
      setUserAddress(accounts[0])
    })
  }, [])

  const disconnect = async () => {
    if (provider.disconnect) {
      await provider.disconnect()
    }
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const config: Config = {
    targetNetwork: networks[idx],
    dappName: 'KKBox',
    open: open && provider !== null,
    handleClose: handleClose,

    // optional
    address: userAddress,

    // dapp
    dappLogo: 'https://www.kkbox.com/about/img/app_icons/kkbox_app_icon.png',
    // theme color
    // color: '#26EFE6',

    // darkmode
    darkMode: Math.random() > 0.5
  }

  return (
    <div>
      <h1>Test Site Title</h1>
      <button type='button' onClick={connectMetamask}>
        MetaMask - Connect
      </button>
      <br />
      <br />
      <button type='button' onClick={connectWalletConnectWeb3}>
        WalletConnect Web3 Provider - Connect
      </button>
      <br />
      <button type='button' onClick={connectWalletConnectClient}>
        WalletConnect Client - Connect
      </button>
      <br />
      <button type='button' onClick={disconnect}>
        WalletConnect - Disconnect
      </button>
      <br />
      <br />
      <button type='button' onClick={handleOpen}>
        Open Modal
      </button>

      <Sorbet config={config} walletProvider={provider} />
      <h5>Address: {userAddress} </h5>
      <h6>Test Site Footer</h6>
    </div>
  )
}

export default App
