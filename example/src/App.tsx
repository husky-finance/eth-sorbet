import React, { useState, useEffect } from 'react'

// import { ExampleComponent } from 'l2-letsgo-crl'
import LetsGo, { xDai } from 'l2-letsgo-crl'
// import 'l2-letsgo-crl/dist/index.css'

const App = () => {
  // return <ExampleComponent text="Create React Library Example 😄" />

  const [isReady, setIsReady] = useState(false)

  const userAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

  useEffect(() => {
    const letsgo = new LetsGo({
      targetNetwork: xDai,
      // optional
      address: userAddress,
      checkBalance: true
    })
    letsgo.setupNetwork().then(() => {
      setIsReady(true)
    })
  }, [userAddress])

  return <div>isReady: {isReady.toString()}</div>
}

export default App
