# eth-sorbet

[![NPM](https://img.shields.io/npm/v/@huskyfinance/eth-sorbet.svg)](https://www.npmjs.com/package/@huskyfinance/eth-sorbet) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<p align="center">
<img src="https://www.flaticon.com/svg/vstatic/svg/938/938136.svg?token=exp=1619424543~hmac=c5d1f651215f66614d46d240bac491ae" height=100>

<p align="center"><code>  Smooth transition to L2, just like sorbet before main course</code></p>

## Install

```bash
npm install --save eth-sorbet
```

## Usage

See [example](./example) for more detailed usage guide.

```tsx
import React, { Component } from 'react'

// import modal and target network config
import Sorbet, { xDai } from 'eth-sorbet'

// load css
import 'eth-sorbet/dist/index.css'

const provider = window.ethereum

const config = {
  targetNetwork: xDai,
  dappName: 'Example App',

  open: open,
  handleClose: handleClose,
  // optional
  address: userAddress,
  checkBalance: true,

  // logo of your app
  dappLogo: 'https://www.kkbox.com/about/img/app_icons/kkbox_app_icon.png',

  // darkmode
  darkMode: true
}

class Example extends Component {
  render() {
    return <Sorbet config={config} walletProvider={provider} />
  }
}
```

## Supported Network

| Network | Config | Native Deposit Supported |
| -------- | -------- | -------- |
| xDai     | ✅     | -     |
| BSC     | ✅     | -     |
| Avalanche     | ✅     | -     |
| Sokol     | ✅     | -     |
| Matic     | ✅     | -     |
| Arbitrum testnet     | ✅     | -     |
| Optimism testnet     | ✅     | -     |
| Optimism     | ✅     | -     |

## Run in dev

Run the library:

```shell
cd \eth-sorbet
yarn start
```

In another terminal, run the example App which will refresh if the library changes

```shell
cd \eth-sorbet\example
yarn start
```

## Publish

```shell
npm publish --access public
```

---


## License

MIT © [flyingnobita](https://github.com/flyingnobita)
