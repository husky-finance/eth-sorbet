import { BigNumber, ethers, providers } from 'ethers'
import Alert from '@material-ui/lab/Alert'

import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { ethChains } from '../../constant/networks'
import { Config } from '../../types'
import Base from '../baseContent'
import Deposit from '../deposit'
import { abis } from '../../contracts'

export default function DepositContent({
  // l2Balance,
  config,
  provider
}: {
  // l2Balance: BigNumber
  config: Config
  provider: ethers.providers.ExternalProvider
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
    if (!config.address || !rpcProvider) return

    rpcProvider
      .getBalance(config.address)
      .then((balance: BigNumber) => setL2Balance(balance))
  }, [config])

  useEffect(() => {
    updateL2Balance()
  }, [updateL2Balance])

  const updateL1Balance = useCallback(() => {
    if (
      !config.address ||
      !provider ||
      chainId !== config.targetNetwork.l1chainId
    )
      return

    const web3Provider = new ethers.providers.Web3Provider(provider)
    // const isToken = config.targetNet work.l1Token !== undefined
    if (config.targetNetwork.l1Token) {
      const token = new ethers.Contract(
        config.targetNetwork.l1Token?.address,
        abis.erc20,
        web3Provider
      )
      token
        .balanceOf(config.address)
        .then((balance: BigNumber) => setL1Balance(balance))
    } else {
      web3Provider
        .getBalance(config.address)
        .then((balance: BigNumber) => setL1Balance(balance))
    }
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

  // revisit bridge urls to match deposit function (e.g. bridge currently points to mainnet but all networks are testnets)
  const bridgeLink = useMemo(() => config.targetNetwork.bridgeUrl, [config])

  // reload if Chain changed
  useEffect(() => {
    ;(provider as any).on('chainChanged', (chainIdHex: string) => {
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
      if (!provider || !provider.request) return

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

  const content = useMemo(() => {
    return (
      <div>
        {onCorrectL1 ? (
          <div>
            Balance on {network}:{' '}
            {ethers.utils.formatUnits(
              l1Balance,
              config.targetNetwork.l1Token?.decimals || 18
            )}{' '}
            {config.targetNetwork.l1Token?.symbol || 'ETH'}
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
        {/* only shows deposit input if the funciton is provided */}
        {(config.targetNetwork.depositETH ||
          config.targetNetwork.depositToken) && (
          <div>
            <Deposit
              config={config}
              provider={provider}
              chainId={chainId}
              l1Balance={l1Balance}
              onCorrectL1={onCorrectL1}
              depositCallback={depositCallback}
            />
          </div>
        )}
      </div>
    )
  }, [config, l2Balance, l1Balance, bridgeLink, network, onCorrectL1])

  return <Base title='Deposit' content={content} />
}
