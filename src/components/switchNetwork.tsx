import React, { useMemo, useCallback } from 'react'
import { Config, web3Provider } from '../types'
import { switchNetwork as rpcSwitchNetwork } from '../utils/rpc'
import BaseModal from './baseModal'

export default function SwitchNetworkModal({
  next,
  previous,
  open,
  handleClose,
  provider,
  config
}: {
  next: Function
  previous: Function
  open: boolean
  provider: web3Provider | undefined
  handleClose: Function
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
    <BaseModal
      handleClose={handleClose}
      title={title}
      description={description}
      content={
        <div>
          <button onClick={onClick}>Switch</button>
        </div>
      }
      previous={previous}
      next={next}
      open={open}
    />
  )
}
