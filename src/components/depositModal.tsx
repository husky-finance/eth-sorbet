import React from 'react'
import { BigNumber } from 'ethers'
import BaseModal from './baseModal'
import { Config } from '../types'

export default function DepositModal({
  next,
  previous,
  l2Balance,
  open,
  config,
  handleClose
}: {
  next: Function
  previous: Function
  l2Balance: BigNumber
  open: boolean
  config: Config
  handleClose: Function
}) {
  const currencySymbol = config.targetNetwork.nativeCurrency?.symbol || 'ETH'
  return (
    <BaseModal
      title='Deposit'
      description={`Make some Deposit! you only got ${l2Balance} ${currencySymbol} on L2`}
      next={next}
      previous={previous}
      open={open}
      handleClose={handleClose}
    />
  )
}
