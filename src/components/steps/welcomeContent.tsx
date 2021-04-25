import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet'
import Base from '../baseContent'
import { Config } from '../../types'

const useStyles = makeStyles(() => ({
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40
  },
  icon: {
    padding: 10
  }
}))

export default function WelcomeModal({ config }: { config: Config }) {
  const classes = useStyles()

  const dappLogo = config.dappLogo ? (
    <img height={60} src={config.dappLogo} />
  ) : null

  const network = config.targetNetwork.img ? (
    <img height={60} src={config.targetNetwork.img} />
  ) : null

  return (
    <Base
      title={`Welcome to ${config.dappName}`}
      content={
        <div>
          {config.dappName} is scaling with {config.targetNetwork.name}, let's
          get you onboard!
          <br />
          <div className={classes.logoWrapper}>
            {dappLogo}
            {dappLogo && network && (
              <SettingsEthernetIcon className={classes.icon} color='primary' />
            )}
            {network}
          </div>
        </div>
      }
    />
  )
}
