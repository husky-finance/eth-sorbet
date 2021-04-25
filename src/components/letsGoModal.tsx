import { BigNumber, providers } from 'ethers'
import React, { useCallback, useEffect, useState } from 'react'
import { Config, WindowChain } from '../types'
import { verifyConfig } from '../utils/verify'
import DepositModal from './depositModal'
import WelcomeModal from './welcomeModal'
import SwitchNetworkModal from './switchNetwork'

enum Steps {
  Welcome,
  DepositL1Balance,
  // WaitingConfirm,
  SwitchNetwork
}

export const LetsgoModal = React.memo(({ config }: { config: Config }) => {
  const [rpcProvider, setRPCProvider] = useState<any | null>(null)
  const [l2Balance, setL2Balance] = useState<BigNumber>(BigNumber.from(0))

  const [step, setSteps] = useState<Steps>(Steps.Welcome)

  useEffect(() => {
    console.log(`l2Balance`, l2Balance.toString())
  }, [l2Balance])

  // verify config on update
  useEffect(() => {
    verifyConfig(config)
    const _rpcProvider = new providers.JsonRpcProvider(
      config.targetNetwork.rpcUrls[0]
    )
    setRPCProvider(_rpcProvider)
  }, [config])

  // update L2 balance
  useEffect(() => {
    if (!config.checkBalance || !config.address || !rpcProvider) return

    rpcProvider
      .getBalance(config.address)
      .then((balance: BigNumber) => setL2Balance(balance))
  }, [config, rpcProvider])

  const nextStep = useCallback(() => {
    setSteps((step) => step + 1)
  }, [])

  const previous = useCallback(() => {
    setSteps((step) => step - 1)
  }, [])

  const walletProvider = (window as WindowChain).ethereum

  return (
    <div>
      {step === Steps.Welcome && (
        <WelcomeModal
          next={nextStep}
          previous={previous}
          open={config.open}
          handleClose={config.handleClose}
        />
      )}
      {step === Steps.DepositL1Balance && (
        <DepositModal
          next={nextStep}
          previous={previous}
          l2Balance={l2Balance}
          config={config}
          open={config.open}
          handleClose={config.handleClose}
        />
      )}
      {step === Steps.SwitchNetwork && (
        <SwitchNetworkModal
          next={nextStep}
          previous={previous}
          open={config.open}
          handleClose={config.handleClose}
          config={config}
          provider={walletProvider}
        />
      )}
    </div>
  )
})
