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
    height: 40
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
    () => <div>Ready to switch to {config.targetNetwork.name}</div>,
    [config]
  )

  console.log(`config.targetNetwork.img`, config.targetNetwork.img)

  const onClick = useCallback(async () => {
    if (!provider) {
      console.log('Please connect wallet first')
      return
    }
    rpcSwitchNetwork(provider, config)
  }, [provider, config])

  const networkDetail = (
    <div>
      <div>
        {config.targetNetwork.img && (
          <img className={classes.img} src={config.targetNetwork.img} />
        )}
      </div>
      <div>Provider: {config.targetNetwork.rpcUrls[0]}</div>
      <div>ChainId: {config.targetNetwork.chainId}</div>
    </div>
  )

  return (
    <BaseContent
      title={title}
      content={
        <div>
          {description}
          <div className={classes.logoWrapper}>{networkDetail}</div>
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
