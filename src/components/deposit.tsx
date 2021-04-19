import React from 'react'
import { BigNumber } from 'ethers'
import BaseModal from './baseModal'

export default function Deposit({
  next,
  previous,
  l2Balance
}: {
  next: Function
  previous: Function
  l2Balance: BigNumber
}) {
  return (
    <BaseModal
      title='Deposit'
      description={`Make some Deposit! you only got ${l2Balance} on L2`}
      next={next}
      previous={previous}
    />
  )
}
