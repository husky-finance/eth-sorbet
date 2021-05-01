import React, { useCallback, useState, useMemo } from 'react'

import { ethers, BigNumber } from 'ethers'
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
  provider,
  l1Balance,
  onCorrectL1,
  depositCallback
}: {
  config: Config
  provider: any
  l1Balance: BigNumber
  onCorrectL1: boolean
  depositCallback: Function
}) {
  const classes = useStyles()

  const [amount, setAmount] = useState(0.1)
  const [isDeposting, setIsDepositing] = useState(false)

  const scaledAmount = useMemo(() => {
    const nativeTokenDecimals = config.targetNetwork.nativeCurrency
      ? config.targetNetwork.nativeCurrency.decimals
      : 18
    return ethers.utils.parseUnits(amount.toString(), nativeTokenDecimals)
  }, [config, amount])

  // check if the input amount is valid
  const hasSufficientAmount = useMemo(() => l1Balance.gte(scaledAmount), [
    scaledAmount,
    l1Balance
  ])

  const handleDeposit = useCallback(async () => {
    const sender = config.address
    if (!sender) throw new Error('User address no specified')
    if (!config.targetNetwork.depositNativeToken)
      throw new Error('Deposit not implemented')

    setIsDepositing(true)
    await config.targetNetwork.depositNativeToken(
      provider,
      scaledAmount.toString(),
      sender,
      () => {
        setIsDepositing(false)
        depositCallback()
      }
    )
  }, [config, scaledAmount])

  return (
    <div className={classes.container}>
      <TextField
        error={onCorrectL1 && !hasSufficientAmount}
        helperText={
          onCorrectL1 && !hasSufficientAmount ? 'insufficent balance' : null
        }
        size='small'
        value={amount}
        type='number'
        variant='outlined'
        onChange={(event) => setAmount(Number(event.target.value))}
      />
      <Button
        disabled={!onCorrectL1 || !hasSufficientAmount || isDeposting}
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
