import React from 'react'

import Base from '../baseContent'
import { Config } from '../../types'

export default function WelcomeModal({ config }: { config: Config }) {
  return (
    <Base
      title={`You're all set`}
      content={`Enjoy your ride with ${config.targetNetwork.name}`}
    />
  )
}
