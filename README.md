# eth-sorbet

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c1284f47efa14c5a947628bcc1c17c17)](https://app.codacy.com/gh/husky-finance/eth-sorbet?utm_source=github.com&utm_medium=referral&utm_content=husky-finance/eth-sorbet&utm_campaign=Badge_Grade_Settings)
[![NPM](https://img.shields.io/npm/v/@huskyfinance/eth-sorbet.svg)](https://www.npmjs.com/package/@huskyfinance/eth-sorbet)

<p align="center">
<img src="https://i.imgur.com/Q6k8YyH.png" height=100>

<p align="center"><code>  Smooth transition to L2, just like sorbet before main course</code></p>

<br>

**Winners of Arbitrum 🏆 and Optimism 🏆 for ETHGlobal Scaling Ethereum 2021 Hackathon**

[**Live Demo**](https://eth-sorbet-demo.netlify.app/)

eth-sorbet is a react component that improves DApp users' onboarding experience to L2 networks or sidechains.

When a user lands on the DApp, it will bring up a series of screens that guides the users to switch to the L2 network that the developer selected. Users will no longer need to manually enter the L2 network configs in their wallets and can make deposits and interact with the L2 networks right away.

![Alt Welcome screen in eth-sorbet](https://i.imgur.com/qeq0yHy.png)
_eth-sorbet saves you from managing user onboarding!_

![Alt Switching networks in eth-sorbet](https://i.imgur.com/kZ3wM1t.png)
_We handle wallet RPC calls to add network for users, instead of asking your users to do that manually._

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

  // the user address to check their balance.
  address: userAddress,

  // logo of your app
  dappLogo: 'https://www.kkbox.com/about/img/app_icons/kkbox_app_icon.png',

  // theme color
  color: '#26EFE6'

  // darkmode
  darkMode: true
}

class Example extends Component {
  render() {
    return <Sorbet config={config} walletProvider={provider} />
  }
}
```

## Supported Networks

<p float="left">

  <!-- Arbitrum -->
  <img src="https://i.imgur.com/Xo8nfAx.png" alt="Arbitrum logo" height=100 width=100>

  <!-- Avalanche -->
  <img src="https://i.imgur.com/g148n1Y.png" alt="Avalanche logo" height=100 width=100>

  <!-- Binance Smart Chain -->
  <img src="https://i.imgur.com/Cp06TKR.png" alt="Binance Smart Chain logo" height=100 width=100>

  <!-- Optimism -->
  <img src="https://i.imgur.com/ZXvd5N0.png" alt="Optimism logo" height=100 width=100>

  <!-- Polygon / Matic -->
  <img src="https://i.imgur.com/pWenOF0.png" alt="Polygon / Matic logo" height=100 width=100>

  <!-- POA (Sokol) -->
  <img src="https://i.imgur.com/bjTlv4Q.png" alt="POA (Sokol) logo" height=100 width=100>

  <!-- xDai -->
  <img src="https://i.imgur.com/NgKW5Il.png" alt="xDai logo" height=100 width=100>

</p>

| Network                   | Config | Native Deposit Supported |
| ------------------------- | ------ | ------------------------ |
| Arbitrum (Kovan)          | ✅     | ✅                       |
| Avalanche                 | ✅     | -                        |
| Binance Smart Chain       | ✅     | -                        |
| Optimism (Kovan)          | ✅     | ✅                       |
| Optimism (Mainnet)        | ✅     | ✅                       |
| Polygon / Matic (Mainnet) | ✅     | ✅                       |
| Polygon / Matic (Mumbai)  | ✅     | ✅                       |
| POA (Sokol)               | ✅     | -                        |
| xDai                      | ✅     | ✅                       |

## Supported Wallets

<!-- Metamask -->
<img src="https://i.imgur.com/DH2m2KD.png" alt="Metamask logo" width=200>

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

---

## License

MIT © 2021 [husky-finance](https://github.com/husky-finance)
