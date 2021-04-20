import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { Config, WindowChain } from '../types'

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0, 0, 0, 0.5)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    padding: '0 30px'
    // height: 100,
    // width: 600
  }
})

/**
 * use `wallet_addEthereumChain` call to request a network switch.
 * @param provider
 * @param config
 * @returns {boolean} success or not
 */
export async function switchNetwork(config: Config): Promise<boolean> {
  const network = config.targetNetwork
  const provider1 = (window as WindowChain).ethereum

  try {
    if (!provider1 || !provider1.request) {
      throw new Error("Can't setup get Provider. window.ethereum is undefined")
    } else {
      await provider1.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${network.chainId.toString(16)}`,
            chainName: network.name,
            nativeCurrency: network.nativeCurrency,
            rpcUrls: network.rpcUrls,
            blockExplorerUrls: [network.blockExplorerUrl]
          }
        ]
      })
      console.log('Switched!')
      return true
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

export default function SwitchNetworkModal({
  next,
  previous,
  open,
  handleClose,
  config
}: {
  next: Function
  previous: Function
  open: boolean
  handleClose: Function
  config: Config
}) {
  const classes = useStyles()

  const title = 'Switch Network'
  const description = 'Ready to switch to ' + config.targetNetwork.name

  return (
    // TODO merge this back with baseModal at some point
    <Modal className={classes.modal} open={open} onClose={() => handleClose()}>
      <div>
        <h1> {title} </h1>
        <p> {description} </p>
        <button
          onClick={async () => {
            await switchNetwork(config)
          }}
        >
          Switch
        </button>
        <button onClick={() => previous()}> Previous </button>
        <button onClick={() => next()}> Next </button>
      </div>
    </Modal>
  )
}
