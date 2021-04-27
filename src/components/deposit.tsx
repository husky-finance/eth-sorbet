import { Config } from '@huskyfinance/eth-sorbet'
import Button from '@material-ui/core/Button'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import * as networks from '../constant/networks'
import { abis, addresses } from './contracts'

export default function Deposit({
  config,
  provider
}: {
  config: Config
  provider: any
}) {
  const metamaskProvider = new ethers.providers.Web3Provider(provider)

  const [signerAddress, setSignerAddress] = useState<string>()
  const [
    contractArbitrumKovan4,
    setContractArbitrumKovan4
  ] = useState<ethers.Contract>()
  const [
    contractOptimismKovan2,
    setContractOptimismKovan2
  ] = useState<ethers.Contract>()

  useEffect(() => {
    if (metamaskProvider) {
      if (config.targetNetwork === networks.ArbitrumTestnet) {
        setContractArbitrumKovan4(
          new ethers.Contract(
            addresses.addressArbitrumKovan4,
            abis.abiArbitrumKovan4,
            metamaskProvider.getSigner()
          )
        )
      } else if (config.targetNetwork === networks.OptimisticTestnet) {
        setContractOptimismKovan2(
          new ethers.Contract(
            addresses.addressOptimismKovan2,
            abis.abiOptimismKovan2,
            metamaskProvider.getSigner()
          )
        )
      }

      const getSignerAddress = async () => {
        const address = await metamaskProvider.getSigner().getAddress()
        setSignerAddress(address)
      }
      getSignerAddress()
    }
  }, [provider])

  const handleDeposit = () => {
    // TODO: Check if user is on ETH Kovan (or from a network stated in settings and switch to network
    // TODO: refresh balance after successful deposit
    if (
      config.targetNetwork === networks.ArbitrumTestnet &&
      contractArbitrumKovan4
    ) {
      contractArbitrumKovan4.depositEth(signerAddress, {
        value: ethers.utils.parseEther(config.depositAmount)
      })
    } else if (
      config.targetNetwork === networks.OptimisticTestnet &&
      contractOptimismKovan2
    ) {
      contractOptimismKovan2.deposit({
        value: ethers.utils.parseEther(config.depositAmount)
      })
    }
  }

  return (
    <Button variant='outlined' color='primary' onClick={handleDeposit}>
      Deposit to
      {' ' +
        config.targetNetwork.name +
        ' ' +
        config.depositAmount +
        ' ' +
        config.depositToken}
    </Button>
  )
}
