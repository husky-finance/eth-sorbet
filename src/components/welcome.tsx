import React from 'react'

import BaseModal from './baseModal'

export default function welcome({
  next,
  previous
}: {
  next: Function
  previous: Function
}) {
  return (
    <BaseModal
      title='Welcome to lets go'
      description={"Let's scale with a diff chain"}
      next={next}
      previous={previous}
    />
  )
}
