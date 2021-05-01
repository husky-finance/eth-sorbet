import React, { useCallback, useState, useMemo, useEffect } from 'react'

import { ethers, BigNumber } from 'ethers'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import LockIcon from '@material-ui/icons/Lock'
import { Config } from '../types'
import { getApproval, approve } from '../utils/basic'

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

  const [amount, setAmount] = useState(0)

  const [allowance, setAllowance] = useState(BigNumber.from(0))

  const [isApproving, setIsApproving] = useState(false)
  const [isDepositing, setIsDepositing] = useState(false)

  const scaledAmount = useMemo(() => {
    const nativeTokenDecimals = config.targetNetwork.l1Token
      ? config.targetNetwork.l1Token.decimals
      : 18
    return ethers.utils.parseUnits(amount.toString(), nativeTokenDecimals)
  }, [config, amount])

  // check if the input amount is valid
  const hasSufficientAmount = useMemo(() => l1Balance.gte(scaledAmount), [
    scaledAmount,
    l1Balance
  ])

  const isTokenDeposit = useMemo(() => {
    return config.targetNetwork.l1Token?.address !== undefined
  }, [config])

  const updateApproval = useCallback(() => {
    if (
      !isTokenDeposit ||
      !config.address ||
      !config.targetNetwork.l1Token ||
      !provider
    )
      return
    const token = config.targetNetwork.l1Token as {
      spender: string
      address: string
      decimals: number
    }

    getApproval(
      provider,
      token.address,
      config.address,
      config.targetNetwork.l1Token?.spender
    ).then((allowance: ethers.BigNumber) => {
      setAllowance(allowance)
    })
  }, [isTokenDeposit, config, provider])

  // update token allowance
  useEffect(() => {
    updateApproval()
  }, [updateApproval])

  // whether user need to approve first
  const needApproval = useMemo(() => {
    return isTokenDeposit && allowance.lt(scaledAmount)
  }, [allowance, scaledAmount])

  const handleApprove = useCallback(async () => {
    const sender = config.address

    const token = config.targetNetwork.l1Token

    if (!sender) throw new Error('User address no specified')
    if (!token) throw new Error('No token defined')

    setIsApproving(true)

    const callback = () => {
      setIsApproving(false)
      updateApproval()
    }

    try {
      await approve(
        provider,
        token.address,
        sender,
        token.spender,
        scaledAmount.toString(),
        callback
      )
    } catch (error) {
      setIsApproving(false)
    }
  }, [config, scaledAmount, provider, updateApproval])

  // deposit function
  const handleDeposit = useCallback(async () => {
    const sender = config.address
    if (!sender) throw new Error('User address no specified')

    setIsDepositing(true)

    const callback = () => {
      setIsDepositing(false)
      depositCallback()
    }
    try {
      if (isTokenDeposit) {
        if (!config.targetNetwork.depositToken)
          throw new Error('Deposit not implemented')
        await config.targetNetwork.depositToken(
          provider,
          config.targetNetwork.l1Token?.address as string,
          scaledAmount.toString(),
          sender,
          callback
        )
      } else {
        if (!config.targetNetwork.depositETH)
          throw new Error('Deposit not implemented')
        await config.targetNetwork.depositETH(
          provider,
          scaledAmount.toString(),
          sender,
          callback
        )
      }
    } catch (error) {
      setIsDepositing(false)
    }
  }, [config, scaledAmount, isTokenDeposit])

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
      {needApproval ? (
        <Button
          disabled={isApproving}
          style={{ height: 40 }}
          variant={amount > 0 ? 'contained' : 'outlined'}
          onClick={handleApprove}
        >
          {' '}
          {isApproving ? (
            <CircularProgress size={20} />
          ) : (
            <LockIcon color='primary' />
          )}{' '}
        </Button>
      ) : (
        <Button
          disabled={
            !onCorrectL1 || !hasSufficientAmount || isDepositing || amount <= 0
          }
          style={{ height: 40 }}
          variant={amount > 0 ? 'contained' : 'outlined'}
          color='primary'
          onClick={handleDeposit}
        >
          {isDepositing ? <CircularProgress size={20} /> : 'Deposit'}
        </Button>
      )}
    </div>
  )
}
