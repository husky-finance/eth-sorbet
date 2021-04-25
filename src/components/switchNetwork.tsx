import React, { useMemo, useCallback } from 'react'
import { Config, web3Provider } from '../types'
import { switchNetwork as rpcSwitchNetwork } from '../utils/rpc'
import BaseContent from './baseContent'

export default function SwitchNetworkContent({
  provider,
  config
}: {
  provider: web3Provider | undefined
  config: Config
}) {
  const title = useMemo(() => 'Switch Network', [])
  const description = useMemo(
    () => 'Ready to switch to ' + config.targetNetwork.name,
    []
  )

  const onClick = useCallback(async () => {
    if (!provider) {
      console.log('Please connect wallet first')
      return
    }
    rpcSwitchNetwork(provider, config)
  }, [provider, config])

  return (
    <BaseContent
      title={title}
      content={
        <div>
          {description}
          <button onClick={onClick}>Switch</button>
        </div>
      }
    />
  )
}
