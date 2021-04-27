import { BigNumber, providers, ethers } from 'ethers'
import React, { useCallback, useEffect, useState, useMemo } from 'react'

import { Config } from './types'
import { verifyConfig } from './utils/verify'
import { ThemeProvider } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'

import Progress from './components/progressbar'
import BaseModal from './components/baseModal'

import Deposit from './components/steps/depositContent'
import Welcome from './components/steps/welcomeContent'
import SwitchNetwork from './components/steps/switchNetwork'
import Finished from './components/steps/finished'

import { light, dark } from './style/defaultTheme'

enum Steps {
  Welcome,
  DepositL1Balance,
  SwitchNetwork,
  Finished
}

export const Sorbet = React.memo(
  ({ config, walletProvider }: { config: Config; walletProvider: any }) => {
    const [rpcProvider, setRPCProvider] = useState<any | null>(null)

    const [l1Balance, setL1Balance] = useState<BigNumber>(BigNumber.from(0))
    const [l2Balance, setL2Balance] = useState<BigNumber>(BigNumber.from(0))

    const [step, setSteps] = useState<Steps>(Steps.Welcome)

    // const [chainId, setChainId] = useState<number>(0)
    // const [network, setNetwork] = useState<string>()

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

    useEffect(() => {
      if (!config.address || !walletProvider) return
      const web3Provider = new ethers.providers.Web3Provider(walletProvider)
      web3Provider
        .getBalance(config.address)
        .then((balance: BigNumber) => setL1Balance(balance))
    }, [walletProvider, config])

    const content = useMemo(() => {
      switch (step) {
        case Steps.Welcome:
          return <Welcome config={config} />
        case Steps.DepositL1Balance:
          return (
            <Deposit
              config={config}
              l1Balance={l1Balance}
              l2Balance={l2Balance}
              provider={walletProvider}
              // chainId={chainId}
              // network={network!}
            />
          )
        case Steps.SwitchNetwork:
          return (
            <SwitchNetwork
              config={config}
              provider={walletProvider}
              nextStep={nextStep}
            />
          )
        default:
          return <Finished config={config} />
      }
    }, [step, config, l2Balance])

    return (
      <ThemeProvider theme={config.darkMode ? dark : light}>
        <BaseModal
          content={
            <div>
              {content}
              {/* Button Row */}
              <div style={{ width: '100%' }}>
                {step !== Steps.Welcome && (
                  <Button
                    variant='outlined'
                    style={{ float: 'left' }}
                    onClick={previous}
                  >
                    Previous
                  </Button>
                )}
                {step !== Steps.Finished && (
                  <Button
                    style={{ float: 'right' }}
                    variant={
                      step === Steps.SwitchNetwork ||
                      step === Steps.DepositL1Balance
                        ? 'outlined'
                        : 'contained'
                    }
                    color='primary'
                    onClick={nextStep}
                  >
                    {step === Steps.SwitchNetwork ||
                    step === Steps.DepositL1Balance
                      ? 'Skip'
                      : 'Next'}
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
          footer={<Progress step={step} />}
          open={config.open && step in Steps}
          handleClose={config.handleClose}
        />
      </ThemeProvider>
    )
  }
)
