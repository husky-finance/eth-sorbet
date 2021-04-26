# eth-sorbet

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

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/eth-sorbet.svg)](https://www.npmjs.com/package/eth-sorbet) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save eth-sorbet
```

## Usage

```tsx
import React, { Component } from 'react'

// import modal and target network config
import Sorbet, {xDai} from 'eth-sorbet'

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

## License

MIT © [flyingnobita](https://github.com/flyingnobita)
