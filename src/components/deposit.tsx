import React, { useCallback, useState, useEffect } from 'react'

import { ethers } from 'ethers'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { Config } from '../types'

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
    const sender = config.address
    if (!sender) throw new Error('User address no specified')
    if (!config.targetNetwork.depositNativeToken)
      throw new Error('Deposit not implemented')

    const nativeTokenDecimals = config.targetNetwork.nativeCurrency
      ? config.targetNetwork.nativeCurrency.decimals
      : 18
    const scaledAmount = ethers.utils.parseUnits(
      amount.toString(),
      nativeTokenDecimals
    )
    await config.targetNetwork.depositNativeToken(
      provider,
      scaledAmount.toString(),
      sender
    )
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
