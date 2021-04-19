import React, { useMemo } from 'react'
import { xDai, LetsgoModal } from 'l2-letsgo-crl'

const App = () => {
  
  const userAddress = useMemo(() => '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', [] ) 

  const config = {
    targetNetwork: xDai,
    // optional
    address: userAddress,
    checkBalance: true
  }

  return (<LetsgoModal config={config}/>)
}

export default App
