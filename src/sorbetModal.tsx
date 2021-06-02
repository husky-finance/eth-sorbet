import Button from '@material-ui/core/Button'
import { ThemeProvider } from '@material-ui/core/styles'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import BaseModal from './components/baseModal'
import Progress from './components/progressbar'
import Deposit from './components/steps/depositContent'
import Finished from './components/steps/finished'
import SwitchNetwork from './components/steps/switchNetwork'
import Welcome from './components/steps/welcomeContent'
import {
  dark,
  darkWithCustomPrimary,
  light,
  lightWithCustomPrimary
} from './style/defaultTheme'
import { Config } from './types'
import { verifyConfig } from './utils/verify'

enum Steps {
  Welcome,
  Deposit,
  SwitchNetwork,
  Finished
}

export const Sorbet = React.memo(
  ({ config, walletProvider }: { config: Config; walletProvider: any }) => {
    const [step, setSteps] = useState<Steps>(Steps.Welcome)

    // verify config on update
    useEffect(() => {
      verifyConfig(config)
    }, [config])

    const nextStep = useCallback(() => {
      setSteps((step) => step + 1)
    }, [])

    const previous = useCallback(() => {
      setSteps((step) => step - 1)
    }, [])

    const content = useMemo(() => {
      switch (step) {
        case Steps.Welcome:
          return <Welcome config={config} />
        case Steps.Deposit:
          return <Deposit config={config} provider={walletProvider} />
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
    }, [step, config])

    const theme = useMemo(() => {
      if (!config.color) {
        return config.darkMode ? dark : light
      } else {
        return config.darkMode
          ? darkWithCustomPrimary(config.color)
          : lightWithCustomPrimary(config.color)
      }
    }, [config])

    return (
      <ThemeProvider theme={theme}>
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
                      step === Steps.SwitchNetwork || step === Steps.Deposit
                        ? 'outlined'
                        : 'contained'
                    }
                    color='primary'
                    onClick={nextStep}
                  >
                    {step === Steps.SwitchNetwork || step === Steps.Deposit
                      ? 'Skip'
                      : 'Next'}
                  </Button>
                )}
                {step === Steps.Finished && (
                  <Button
                    color='primary'
                    style={{ float: 'right' }}
                    onClick={() => config.handleClose(false)}
                    variant='contained'
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
