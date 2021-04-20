import React from 'react'

import BaseModal from './baseModal'

export default function WelcomeModal({
  next,
  previous,
  open,
  handleClose
}: {
  next: Function
  previous: Function
  open: boolean
  handleClose: Function
}) {
  return (
    <BaseModal
      title='Welcome to lets go'
      description={"Let's scale with a diff chain"}
      next={next}
      previous={previous}
      open={open}
      handleClose={handleClose}
    />
  )
}
