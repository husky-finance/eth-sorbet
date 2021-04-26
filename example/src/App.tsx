import { LetsgoModal, Binance, ArbitrumTestnet, OptimisticMainnet, xDai, Avalanche, Config } from 'l2-letsgo-crl'
import React, { useEffect, useState } from 'react'
import type { WindowChain } from './types'

import 'l2-letsgo-crl/dist/index.css'

const networks = [Binance, ArbitrumTestnet, OptimisticMainnet, xDai, Avalanche,]
const ran = parseInt((Math.random()* networks.length).toFixed(0))
const idx = ran === 0 ? ran : ran - 1

const App = () => {
  const [open, setOpen] = useState(true)
  const [userAddress, setUserAddress] = useState('')

  const provider = (window as WindowChain).ethereum

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
        "Can't setup get Provider. window.ethereum is undefined"
      setUserAddress(errorMessage)
    } else {
      fetchData(provider)
    }
  }, [provider])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const config: Config = {
    targetNetwork: networks[idx] ,
    dappName: 'KKBox',
    open: open,
    handleClose: handleClose,
    
    // optional
    address: userAddress,
    checkBalance: true,

    // dapp
    dappLogo: 'https://www.kkbox.com/about/img/app_icons/kkbox_app_icon.png',
    
    // darkmode
    darkMode: false
  }

  return (
    <div>
      <h1>Test Site Title</h1>
      <button type='button' onClick={handleOpen}>
        Open Modal
      </button>
      <LetsgoModal config={config} walletProvider={provider} />
      <h5>Address: {userAddress} </h5>
      <h6>Test Site Footer</h6>
    </div>
  )
}

export default App
