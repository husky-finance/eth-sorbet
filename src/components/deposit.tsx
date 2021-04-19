import React from 'react'
import { BigNumber } from 'ethers'
import BaseModal from './baseModal'

export default function Deposit({
  next,
  previous,
  l2Balance,
  open,
  handleClose
}: {
  next: Function
  previous: Function
  l2Balance: BigNumber
  open: boolean
  handleClose: Function
}) {
  return (
    <BaseModal
      title='Deposit'
      description={`Make some Deposit! you only got ${l2Balance} on L2`}
      next={next}
      previous={previous}
      open={open}
      handleClose={handleClose}
    />
  )
}
