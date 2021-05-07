# eth-sorbet

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c1284f47efa14c5a947628bcc1c17c17)](https://app.codacy.com/gh/husky-finance/eth-sorbet?utm_source=github.com&utm_medium=referral&utm_content=husky-finance/eth-sorbet&utm_campaign=Badge_Grade_Settings)
[![NPM](https://img.shields.io/npm/v/@huskyfinance/eth-sorbet.svg)](https://www.npmjs.com/package/@huskyfinance/eth-sorbet)

<p align="center">
<img src="https://i.imgur.com/Q6k8YyH.png" height=100>

<p align="center"><code>  Smooth transition to L2, just like sorbet before main course</code></p>

<br>

Sorbet saves you from managing user onboarding!
![](https://i.imgur.com/qeq0yHy.png)

We handle wallet RPC calls to add network for users, instead of asking your users to do that manually.
![](https://i.imgur.com/kZ3wM1t.png)

## Install

```bash
npm install --save @huskyfinance/eth-sorbet
```

## Usage

See [example](./example) for more detailed usage guide.

```tsx
import React, { Component } from 'react'

// import modal and target network config
import { Sorbet, xDai } from '@huskyfinance/eth-sorbet'

// load css
import '@huskyfinance/eth-sorbet/dist/index.css'

const provider = window.ethereum

const config = {
  targetNetwork: xDai,
  dappName: 'Example App',

  open: isOpen,
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

| Network          | Config | Native Deposit Supported |
| ---------------- | ------ | ------------------------ |
| xDai             | ✅     | -                        |
| BSC              | ✅     | -                        |
| Avalanche        | ✅     | -                        |
| Sokol            | ✅     | -                        |
| Matic            | ✅     | ✅                       |
| Arbitrum testnet | ✅     | ✅                       |
| Optimism testnet | ✅     | ✅                       |
| Optimism         | ✅     | -                        |

### Supported Wallet

| Network  | Add Network | Switch Network |
| -------- | ----------- | -------------- |
| MetaMask | ✅          | ✅             |

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

MIT © [husky-finance](https://github.com/husky-finance)
