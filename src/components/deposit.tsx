import React from 'react'

import BaseModal from './baseModal'

export default function Deposit({
  next,
  previous
}: {
  next: Function
  previous: Function
}) {
  return (
    <BaseModal
      title='Deposit'
      description='Make some Deposit!'
      next={next}
      previous={previous}
    />
  )
}
