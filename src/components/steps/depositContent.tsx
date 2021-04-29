import { BigNumber, ethers } from 'ethers'
import Alert from '@material-ui/lab/Alert'

import React, { useEffect, useMemo, useState } from 'react'
import { ethChains } from '../../constant/networks'
import { Config } from '../../types'
import Base from '../baseContent'
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
  const [network, setNetwork] = useState<string>()
  const [chainId, setChainId] = useState<number>(0)

  const currencySymbol = useMemo(
    () => config.targetNetwork.nativeCurrency?.symbol || 'ETH',
    [config]
  )

  const decimals = useMemo(
    () => config.targetNetwork.nativeCurrency?.decimals || 18,
    [config]
  )

  const bridgeLink = useMemo(() => config.targetNetwork.bridgeUrl, [config])

  // reload if Chain changed
  useEffect(() => {
    provider.on('chainChanged', (chainIdHex: string) => {
      const chainIdDec = parseInt(chainIdHex, 16)
      setChainId(chainIdDec)
      if (chainIdDec in ethChains) {
        setNetwork(ethChains[chainIdDec])
      } else {
        setNetwork('Unknown Network')
      }
    })
  })

  useEffect(() => {
    const getChainId = async () => {
      if (!provider) return

      const chainIdHex = await provider.request({ method: 'eth_chainId' })
      const chainIdDec = parseInt(chainIdHex, 16)
      setChainId(chainIdDec)
      if (chainIdDec in ethChains) {
        setNetwork(ethChains[chainIdDec])
      } else {
        setNetwork('Unknown Network')
      }
    }
    getChainId()
  }, [provider])

  const onCorrectL1 = useMemo(() => config.l1ChainId === chainId, [
    chainId,
    config
  ])

  // TODO: refresh balance after successful deposit
  const content = useMemo(() => {
    return (
      <div>
        {onCorrectL1 ? (
          <div>
            Balance on {network}: {ethers.utils.formatUnits(l1Balance, 18)} ETH
          </div>
        ) : (
          <Alert
            style={{ backgroundColor: 'inherit', paddingLeft: 0 }}
            severity='warning'
          >
            You are currently on {network}, please switch to{' '}
            {ethChains[config.l1ChainId]} to deposit
          </Alert>
        )}

        <div>
          Balance on {config.targetNetwork.name}:{' '}
          {ethers.utils.formatUnits(l2Balance, decimals)} {currencySymbol}
        </div>
        <br />
        {bridgeLink && (
          <div>
            Your can deposit more tokens via the{' '}
            <a target='_blank' href={bridgeLink} rel='noreferrer'>
              {' '}
              bridge here
            </a>{' '}
            .
          </div>
        )}
        {/* only shows deposit input if the funciton is provided */}
        {config.targetNetwork.depositNativeToken && (
          <div>
            <Deposit
              config={config}
              provider={provider}
              l1Balance={l1Balance}
              onCorrectL1={onCorrectL1}
            />
          </div>
        )}
      </div>
    )
  }, [config, l2Balance, bridgeLink, network, onCorrectL1])

  return <Base title='Deposit' content={content} />
}
