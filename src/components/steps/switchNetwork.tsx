import React, { useMemo, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { ethers } from 'ethers'
import { Config } from '../../types'
import { switchNetwork as rpcSwitchNetwork } from '../../utils/rpc'
import BaseContent from '../baseContent'

const useStyles = makeStyles(() => ({
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10
  },
  child: {
    display: 'inline-block',
    paddingBottom: 8
  },
  img: {
    height: 40
  }
}))

export default function SwitchNetworkContent({
  provider,
  config,
  nextStep
}: {
  provider: ethers.providers.ExternalProvider | undefined
  config: Config
  nextStep: Function
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
    const success = await rpcSwitchNetwork(provider, config)
    if (success) nextStep()
  }, [provider, config])

  const networkDetail = (
    <div className={classes.center}>
      <div className={classes.child}>
        {config.targetNetwork.img && (
          <img className={classes.img} src={config.targetNetwork.img} />
        )}
      </div>
      <div className={classes.child}>
        Provider: {config.targetNetwork.rpcUrls[0]}
      </div>
      <div className={classes.child}>
        ChainId: {config.targetNetwork.chainId}
      </div>
      <Button onClick={onClick} variant='contained' color='primary'>
        Switch
      </Button>
    </div>
  )

  return (
    <BaseContent
      title={title}
      content={
        <div>
          {description}
          {networkDetail}
        </div>
      }
    />
  )
}
