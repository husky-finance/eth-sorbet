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
  Config,
} from '@huskyfinance/eth-sorbet'
import { WindowChain } from '../../src/types'

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
      const accounts = await provider.request({
        method: 'eth_requestAccounts'
      })
      const account = accounts[0]
      setUserAddress(account)
    }

    if (!provider || !provider.request) {
      const errorMessage =
        "Please connect wallet first"
      setUserAddress(errorMessage)
    } else {
      fetchData(provider)
    }
  }, [provider])

  const useMetamask = useCallback(() => {
    setProvider((window as WindowChain).ethereum)
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const config: Config = {
    targetNetwork: networks[idx],
    dappName: 'KKBox',
    open: open && provider,
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
      <button type='button' onClick={useMetamask}>
        Connect metamask
      </button>
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
