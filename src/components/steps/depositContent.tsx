import { BigNumber, ethers, providers } from 'ethers'
import Alert from '@material-ui/lab/Alert'

import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { ethChains } from '../../constant/networks'
import { Config } from '../../types'
import Base from '../baseContent'
import Deposit from '../deposit'

export default function DepositContent({
  // l2Balance,
  config,
  provider
}: {
  // l2Balance: BigNumber
  config: Config
  provider: any
}) {
  const [network, setNetwork] = useState<string>()
  const [chainId, setChainId] = useState<number>(0)

  const [l1Balance, setL1Balance] = useState(BigNumber.from(0))
  const [l2Balance, setL2Balance] = useState(BigNumber.from(0))

  // update L2 balance
  const updateL2Balance = useCallback(() => {
    const rpcProvider = new providers.JsonRpcProvider(
      config.targetNetwork.rpcUrls[0]
    )
    if (!config.checkBalance || !config.address || !rpcProvider) return

    rpcProvider
      .getBalance(config.address)
      .then((balance: BigNumber) => setL2Balance(balance))
  }, [config])

  useEffect(() => {
    updateL2Balance()
  }, [updateL2Balance])

  const updateL1Balance = useCallback(() => {
    if (!config.address || !provider) return
    const web3Provider = new ethers.providers.Web3Provider(provider)
    web3Provider
      .getBalance(config.address)
      .then((balance: BigNumber) => setL1Balance(balance))
  }, [provider, config, chainId])

  // update L1 balance
  useEffect(() => {
    updateL1Balance()
  }, [updateL1Balance])

  // function to be executed when the deposit tx got confirmed
  const depositCallback = useCallback(() => {
    updateL1Balance()
    updateL2Balance()
  }, [updateL1Balance, updateL2Balance])

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

  const onCorrectL1 = useMemo(
    () => config.targetNetwork.l1chainId === chainId,
    [chainId, config]
  )

  // TODO: refresh balance after successful deposit
  const content = useMemo(() => {
    return (
      <div>
        {onCorrectL1 ? (
          <div>
            Balance on {network}: {ethers.utils.formatUnits(l1Balance, 18)} ETH
          </div>
        ) : (
          config.targetNetwork.l1chainId && (
            <Alert
              style={{ backgroundColor: 'inherit', paddingLeft: 0 }}
              severity='warning'
            >
              You are currently on {network}, please switch to{' '}
              {ethChains[config.targetNetwork.l1chainId]} to deposit
            </Alert>
          )
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
              depositCallback={depositCallback}
            />
          </div>
        )}
      </div>
    )
  }, [config, l2Balance, bridgeLink, network, onCorrectL1])

  return <Base title='Deposit' content={content} />
}
