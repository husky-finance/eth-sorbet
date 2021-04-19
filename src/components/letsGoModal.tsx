import React, { useEffect, useState, useCallback } from 'react'

import Welcome from './welcome'
import Deposit from './deposit'

import { Config } from '../types'
import { verifyConfig } from '../utils/verify'
import { providers, BigNumber } from 'ethers'

enum Steps {
  Welcome,
  DepositL1Balance,
  WaitingConfirm,
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

  return (
    <div>
      {step === Steps.Welcome && (
        <Welcome next={nextStep} previous={previous} />
      )}
      {step === Steps.DepositL1Balance && (
        <Deposit next={nextStep} previous={previous} />
      )}
    </div>
  )
})
