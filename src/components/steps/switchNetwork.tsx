import React, { useMemo, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import { Config, web3Provider } from '../../types'
import { switchNetwork as rpcSwitchNetwork } from '../../utils/rpc'
import BaseContent from '../baseContent'

const useStyles = makeStyles(() => ({
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40
  },
  img: {
    height: 60
  }
}))

export default function SwitchNetworkContent({
  provider,
  config
}: {
  provider: web3Provider | undefined
  config: Config
}) {
  const classes = useStyles()

  const title = useMemo(() => 'Switch Network', [])
  const description = useMemo(
    () => 'Ready to switch to ' + config.targetNetwork.name,
    []
  )

  console.log(`config.targetNetwork.img`, config.targetNetwork.img)

  const onClick = useCallback(async () => {
    if (!provider) {
      console.log('Please connect wallet first')
      return
    }
    rpcSwitchNetwork(provider, config)
  }, [provider, config])

  const networkLogo = config.targetNetwork.img ? (
    <img className={classes.img} src={config.targetNetwork.img} />
  ) : null

  return (
    <BaseContent
      title={title}
      content={
        <div>
          {description}
          <div className={classes.logoWrapper}>{networkLogo}</div>
          <div>
            <Button onClick={onClick} variant='contained' color='primary'>
              Switch
            </Button>
          </div>
        </div>
      }
    />
  )
}
