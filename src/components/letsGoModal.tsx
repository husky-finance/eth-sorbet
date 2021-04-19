import React, { useEffect, useState } from 'react'

import BaseModal from './baseModal'

import { Config } from '../types'
import { verifyConfig } from '../utils/verify'
import { providers, BigNumber } from 'ethers'

export const LetsgoModal = React.memo(({ config }: { config: Config }) => {
  const [rpcProvider, setRPCProvider] = useState<any | null>(null)
  const [l2Balance, setL2Balance] = useState<BigNumber>(BigNumber.from(0))

  useEffect(() => {
    console.log(`l2Balance`, l2Balance.toString())
  }, [l2Balance])

  // verify config on update
  useEffect(() => {
    verifyConfig(config)
    const _rpcProvider = new providers.JsonRpcProvider(
      config.targetNetwork.rpcUrls[0]
    )
    setRPCProvider(_rpcProvider)
  }, [config])

  // update L2 balance
  useEffect(() => {
    if (!config.checkBalance || !config.address || !rpcProvider) return

    rpcProvider
      .getBalance(config.address)
      .then((balance: BigNumber) => setL2Balance(balance))
  }, [config, rpcProvider])

  return <BaseModal />
})
