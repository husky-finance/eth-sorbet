import React from 'react'

import BaseModal from './baseModal'
import { Config } from '../types'

export default function WelcomeModal({
  next,
  previous,
  open,
  handleClose,
  config
}: {
  next: Function
  previous: Function
  open: boolean
  handleClose: Function
  config: Config
}) {
  return (
    <BaseModal
      title={`Welcome to ${config.dappName}`}
      description={"Let's scale with a diff chain"}
      next={next}
      previous={previous}
      open={open}
      handleClose={handleClose}
    />
  )
}
