import React, { useCallback, useState, useMemo, useEffect } from 'react'

import { ethers, BigNumber } from 'ethers'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import LockIcon from '@material-ui/icons/Lock'

import { Config } from '../types'
import { getAllowance, approve } from '../utils/basic'
import { MAX_UINT } from '../constant/number'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3, 0, 3)
  }
}))

export default function DepositToken({
  config,
  provider,
  l1Balance,
  chainId,
  onCorrectL1,
  depositCallback
}: {
  config: Config
  provider: ethers.providers.ExternalProvider
  l1Balance: BigNumber
  chainId: number
  onCorrectL1: boolean
  depositCallback: Function // funciton executed after deposit is confirmed
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

  console.log(`isTokenDeposit`, isTokenDeposit)

  const updateAllowance = useCallback(() => {
    if (
      !isTokenDeposit ||
      !config.address ||
      !config.targetNetwork.l1Token ||
      !provider ||
      chainId !== config.targetNetwork.l1chainId
    )
      return

    const token = config.targetNetwork.l1Token as {
      spender: string | undefined
      address: string
      decimals: number
    }

    // if no spender specified, assume no approval is requried.
    if (token.spender === undefined) {
      setAllowance(BigNumber.from(MAX_UINT))
      console.log(`no spender`)
      return
    }

    getAllowance(provider, token.address, config.address, token.spender).then(
      (allowance: ethers.BigNumber) => {
        setAllowance(allowance)
      }
    )
  }, [isTokenDeposit, config, provider, chainId])

  useEffect(() => {
    updateAllowance()
  }, [updateAllowance])

  // whether user need to approve first
  const needApproval = useMemo(() => {
    return isTokenDeposit && allowance.lt(scaledAmount)
  }, [allowance, scaledAmount])

  const handleApprove = useCallback(async () => {
    const sender = config.address

    const token = config.targetNetwork.l1Token

    if (!sender) throw new Error('User address no specified')
    if (!token) throw new Error('No token defined')
    if (!token.spender) throw new Error('No spender to approve!')

    setIsApproving(true)

    const callback = () => {
      setIsApproving(false)
      updateAllowance()
    }

    try {
      await approve(
        provider,
        token.address,
        token.spender,
        token.spender,
        scaledAmount.toString(),
        callback
      )
    } catch (error) {
      setIsApproving(false)
    }
  }, [config, scaledAmount, provider, updateAllowance])

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
          onCorrectL1 && !hasSufficientAmount
            ? 'Insufficent balance'
            : needApproval
            ? `Please unlock ${config.targetNetwork.l1Token?.symbol as string}`
            : null
        }
        size='small'
        value={amount}
        type='number'
        variant='outlined'
        onChange={(event) => setAmount(Number(event.target.value))}
      />
      {needApproval ? (
        <Button
          disabled={isApproving || !onCorrectL1}
          style={{ height: 40 }}
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
