import React, { useMemo } from 'react'
import { ethers, BigNumber } from 'ethers'
import Base from '../baseContent'

import { Config } from '../../types'
import Deposit from '../deposit'

export default function DepositContent({
  l1Balance,
  l2Balance,
  config,
  provider
}: {
  l1Balance: BigNumber
  l2Balance: BigNumber
  config: Config
  provider: any
}) {
  const currencySymbol = useMemo(
    () => config.targetNetwork.nativeCurrency?.symbol || 'ETH',
    [config]
  )

  const decimals = useMemo(
    () => config.targetNetwork.nativeCurrency?.decimals || 18,
    [config]
  )

  const link = useMemo(() => config.targetNetwork.bridgeUrl, [config])

  const content = useMemo(() => {
    return (
      <div>
        <div>
          Your current balance on Mainnet:{' '}
          {ethers.utils.formatUnits(l1Balance, 18)} ETH
        </div>
        <div>
          Your current balance on {config.targetNetwork.name}:{' '}
          {ethers.utils.formatUnits(l2Balance, decimals)} {currencySymbol}
        </div>
        {link && (
          <div>
            Your can deposit more via the{' '}
            <a target='_blank' href={link} rel='noreferrer'>
              {' '}
              bridge here
            </a>{' '}
            .
          </div>
        )}
        <div>
          <Deposit config={config} provider={provider} />
        </div>
      </div>
    )
  }, [config, l2Balance])

  return <Base title='Deposit' content={content} />
}
