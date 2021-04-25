import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Base from '../baseContent'
import { Config } from '../../types'

const useStyles = makeStyles(() => ({
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40
  }
}))

export default function WelcomeModal({ config }: { config: Config }) {
  const classes = useStyles()

  const logo = config.dappLogo ? (
    <img height={60} src={config.dappLogo} />
  ) : null

  return (
    <Base
      title={`Welcome to ${config.dappName}`}
      content={
        <div>
          {config.dappName} is scaling with {config.targetNetwork.name}, let's
          get you onboard!
          <br />
          <div className={classes.logoWrapper}>{logo}</div>
        </div>
      }
    />
  )
}
