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
  const metamaskProvider = new ethers.providers.Web3Provider(provider)

  const [signerAddress, setSignerAddress] = useState<string>()
  const [inboxContract, setInboxContract] = useState<ethers.Contract>()

  useEffect(() => {
    if (metamaskProvider) {
      console.log('provider2: ', metamaskProvider)
      setInboxContract(
        new ethers.Contract(
          addressInboxKovan4,
          abiInboxKovan4,
          metamaskProvider.getSigner()
        )
      )

      const getSignerAddress = async () => {
        const address = await metamaskProvider.getSigner().getAddress()
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
