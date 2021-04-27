import React, { useMemo, useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { Config } from '../types'

import {
  depositArbitrumTestnet,
  depositOptimismTestnet
} from '../utils/deposit'

const useStyles = makeStyles(() => ({
  container: {}
}))

export default function DepositToken({
  config,
  provider
}: {
  config: Config
  provider: any
}) {
  const classes = useStyles()

  const [amount, setAmount] = useState('1')

  const tokenSymbolToDeposit = useMemo(
    () => config.targetNetwork.nativeCurrency?.symbol,
    [config]
  )

  const handleDeposit = useCallback(async () => {
    if (!config.address) {
      throw new Error('User address no specified')
      return
    }
    switch (config.targetNetwork.name) {
      case 'Optimism - Kovan': {
        await depositOptimismTestnet(provider, amount, config.address)
        break
      }
      case 'Arbitrum - Kovan': {
        await depositArbitrumTestnet(provider, amount, config.address)
        break
      }

      default: {
        throw new Error('Deposit of this token not supported yet')
        break
      }
    }
  }, [config, amount])

  return (
    <div className={classes.container}>
      <TextField
        variant='outlined'
        onChange={(event) => setAmount(event.target.value)}
      />
      <Button variant='outlined' color='primary' onClick={handleDeposit}>
        Deposit {tokenSymbolToDeposit} to {config.targetNetwork.name}
      </Button>
    </div>
  )
}
