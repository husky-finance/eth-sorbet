import { Config } from '@huskyfinance/eth-sorbet'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import abiInboxKovan4 from './arbitrumInbox.json'
import Button from '@material-ui/core/Button'

const addressInboxKovan4 = '0xd71d47ad1b63981e9db8e4a78c0b30170da8a601'

export default function DepositArbitrum({
  config,
  provider
}: {
  config: Config
  provider: any
}) {
  const provider2 = new ethers.providers.Web3Provider((window as any).ethereum)

  const [signerAddress, setSignerAddress] = useState<string>()
  const [inboxContract, setInboxContract] = useState<ethers.Contract>()

  useEffect(() => {
    if (provider2) {
      console.log('provider2: ', provider2)
      setInboxContract(
        new ethers.Contract(
          addressInboxKovan4,
          abiInboxKovan4,
          provider2.getSigner()
          // provider.metamask.getSigner()
        )
      )

      const getSignerAddress = async () => {
        const address = await provider2.getSigner().getAddress()
        setSignerAddress(address)
      }
      getSignerAddress()
    }
  }, [provider])

  const handleDeposit = () => {
    console.log(signerAddress)
    if (inboxContract) {
      inboxContract.depositEth(signerAddress, {
        value: ethers.utils.parseEther(config.depositAmount)
      })
    }
  }

  return (
    <Button variant='outlined' color='primary' onClick={handleDeposit}>
      Deposit to Arbitrum ({config.depositAmount + ' ' + config.depositToken})
    </Button>
  )
}
