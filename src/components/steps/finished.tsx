import React from 'react'

import Base from '../baseContent'
import { Config } from '../../types'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60
  },
  icon: {
    padding: 10
  }
}))

export default function WelcomeModal({ config }: { config: Config }) {
  const classes = useStyles()
  const sorbetLogo = <img height={120} src='https://i.imgur.com/Q6k8YyH.png' />
  return (
    <Base
      title={`You're all set`}
      content={
        <div>
          Enjoy your ride with {config.targetNetwork.name} 🚀
          <div className={classes.logoWrapper}>{sorbetLogo}</div>
        </div>
      }
      //
    />
  )
}
