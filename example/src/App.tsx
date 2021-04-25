import { LetsgoModal, xDai } from 'l2-letsgo-crl'
import React, { useEffect, useState } from 'react'
import type { WindowChain } from './types'

const App = () => {
  const [open, setOpen] = useState(true)
  const [userAddress, setUserAddress] = useState('')

  useEffect(() => {
    const provider = (window as WindowChain).ethereum

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
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const config = {
    targetNetwork: xDai,


    dappName: 'Example App',
    // optional
    address: userAddress,
    checkBalance: true,
    open: open,
    handleClose: handleClose,

  }

  return (
    <div>
      <h1>Test Site Title</h1>
      <button type='button' onClick={handleOpen}>
        Open Modal
      </button>
      <LetsgoModal config={config} />
      <h5>Address: {userAddress} </h5>
      <h6>Test Site Footer</h6>
    </div>
  )
}

export default App
