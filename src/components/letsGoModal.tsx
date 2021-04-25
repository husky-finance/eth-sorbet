import { BigNumber, providers } from 'ethers'
import React, { useCallback, useEffect, useState, useMemo } from 'react'

import { Config, WindowChain } from '../types'
import { verifyConfig } from '../utils/verify'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import BaseModal from './baseModal'

import Deposit from './depositContent'
import Welcome from './welcomeContent'
import SwitchNetwork from './switchNetwork'

enum Steps {
  Welcome,
  DepositL1Balance,
  // WaitingConfirm,
  SwitchNetwork
}

const steps = ['Welcome!', 'Deposit', 'Switch Network']

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

  const content = useMemo(() => {
    switch (step) {
      case Steps.Welcome:
        return <Welcome config={config} />
      case Steps.DepositL1Balance:
        return <Deposit config={config} l2Balance={l2Balance} />
      case Steps.SwitchNetwork:
        return <SwitchNetwork config={config} provider={walletProvider} />
      default:
        return 'Unknown stepIndex'
    }
  }, [step, config, l2Balance])

  const progressBar = (
    <div>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )

  return (
    <div>
      <BaseModal
        content={
          <div>
            {content}
            {progressBar}
            <Button onClick={previous}> previous </Button>
            <Button onClick={nextStep}> next </Button>
          </div>
        }
        open={config.open}
        handleClose={config.handleClose}
      />
    </div>
  )
})
