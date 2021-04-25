import React from 'react'

import Base from '../baseContent'
import { Config } from '../../types'

export default function WelcomeModal({ config }: { config: Config }) {
  return (
    <Base
      title={`Welcome to ${config.dappName}`}
      content={"Let's scale with a diff chain"}
    />
  )
}
