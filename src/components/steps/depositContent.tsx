import React, { useMemo } from 'react'
import { BigNumber } from 'ethers'
import Base from '../baseContent'
import { Config } from '../../types'

export default function DepositContent({
  l2Balance,
  config
}: {
  l2Balance: BigNumber
  config: Config
}) {
  const currencySymbol = useMemo(
    () => config.targetNetwork.nativeCurrency?.symbol || 'ETH',
    [config]
  )

  const link = useMemo(() => config.targetNetwork.bridgeUrl, [config])

  const content = useMemo(() => {
    return (
      <div>
        <div>
          Your current balance on {config.targetNetwork.name}:{' '}
          {l2Balance.toString()} {currencySymbol}
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
      </div>
    )
  }, [config, l2Balance])

  return <Base title='Deposit' content={content} />
}
