import { BigNumber, providers } from 'ethers'
import React, { useCallback, useEffect, useState, useMemo } from 'react'

import { Config, WindowChain } from './types'
import { verifyConfig } from './utils/verify'
import { ThemeProvider } from '@material-ui/core/styles'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import BaseModal from './components/baseModal'

import Deposit from './components/steps/depositContent'
import Welcome from './components/steps/welcomeContent'
import SwitchNetwork from './components/steps/switchNetwork'
import Finished from './components/steps/finished'

import { defaultTheme } from './style/defaultTheme'

enum Steps {
  Welcome,
  DepositL1Balance,
  // WaitingConfirm,
  SwitchNetwork,
  Finished
}

const steps = ['Welcome', 'Deposit', 'Switch Network', 'Done']

export const LetsgoModal = React.memo(({ config }: { config: Config }) => {
  const [rpcProvider, setRPCProvider] = useState<any | null>(null)
  const [l2Balance, setL2Balance] = useState<BigNumber>(BigNumber.from(0))

  const [step, setSteps] = useState<Steps>(Steps.Welcome)

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
        return <Finished config={config} />
    }
  }, [step, config, l2Balance])

  const progressBar = (
    <div>
      <Stepper activeStep={step} alternativeLabel style={{ paddingLeft: 0 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )

  return (
    <ThemeProvider theme={defaultTheme}>
      <BaseModal
        content={
          <div>
            {content}
            {progressBar}

            {/* Button Row */}
            <div style={{ width: '100%' }}>
              {step !== Steps.Welcome && (
                <Button onClick={previous}> Previous </Button>
              )}
              {step !== Steps.Finished && (
                <Button
                  style={{ float: 'right' }}
                  variant='contained'
                  color='primary'
                  onClick={nextStep}
                >
                  Next{' '}
                </Button>
              )}
              {step === Steps.Finished && (
                <Button
                  style={{ float: 'right' }}
                  onClick={() => config.handleClose(false)}
                >
                  {' '}
                  Done{' '}
                </Button>
              )}
            </div>
          </div>
        }
        open={config.open && step in Steps}
        handleClose={config.handleClose}
      />
    </ThemeProvider>
  )
})
