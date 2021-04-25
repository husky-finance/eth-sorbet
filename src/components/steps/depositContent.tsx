import React from 'react'
import { BigNumber } from 'ethers'
import Base from '../baseContent'
import { Config } from '../../types'

export default function DepositContent({
  l2Balance,
  config
}: {
  l2Balance: BigNumber
  config: Config
}) {
  const currencySymbol = config.targetNetwork.nativeCurrency?.symbol || 'ETH'
  return (
    <Base
      title='Deposit'
      content={`Make some Deposit! you only got ${l2Balance} ${currencySymbol} on L2`}
    />
  )
}
