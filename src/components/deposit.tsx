import React, { useCallback, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { Config } from '../types'

import {
  depositArbitrumTestnet,
  depositOptimismTestnet
} from '../utils/deposit'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3, 0, 3)
  }
}))

export default function DepositToken({
  config,
  provider
}: {
  config: Config
  provider: any
}) {
  const classes = useStyles()

  const [amount, setAmount] = useState(1)

  // check if the input amount is valid
  useEffect(() => {}, [])

  const handleDeposit = useCallback(async () => {
    if (!config.address) {
      throw new Error('User address no specified')
      return
    }
    switch (config.targetNetwork.name) {
      case 'Optimism - Kovan': {
        await depositOptimismTestnet(
          provider,
          amount.toString(),
          config.address
        )
        break
      }
      case 'Arbitrum - Kovan': {
        await depositArbitrumTestnet(
          provider,
          amount.toString(),
          config.address
        )
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
        size='small'
        value={amount}
        type='number'
        variant='outlined'
        onChange={(event) => setAmount(Number(event.target.value))}
      />
      <Button
        style={{ height: 40 }}
        variant={amount > 0 ? 'contained' : 'outlined'}
        color='primary'
        onClick={handleDeposit}
      >
        Deposit
      </Button>
    </div>
  )
}
