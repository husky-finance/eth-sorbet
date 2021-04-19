import React, { useMemo } from 'react'
import { xDai, LetsgoModal } from 'l2-letsgo-crl'

const App = () => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const userAddress = useMemo(
    () => '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    []
  )

  const config = {
    targetNetwork: xDai,
    // optional
    address: userAddress,
    checkBalance: true,
    open: open,
    handleClose: handleClose
  }

  console.log(typeof handleClose)

  return (
    <div>
      <h1>Test Site Title</h1>
      <button type='button' onClick={handleOpen}>
        Open Modal
      </button>
      <LetsgoModal config={config} />
      <h6>Test Site Footer</h6>
    </div>
  )
}

export default App
