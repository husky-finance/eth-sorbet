# l2-letsgo-crl

## Run in dev

Run the library:

```shell
cd \l2-letsgo-crl
yarn start
```

In another terminal, run the example App which will refresh if the library changes

```shell
cd \l2-letsgo-crl\example
yarn start
```

## Publish

```shell
npm publish --access public
```

---

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/l2-letsgo-crl.svg)](https://www.npmjs.com/package/l2-letsgo-crl) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save l2-letsgo-crl
```

## Usage

```tsx
import React, { Component } from 'react'

// import modal and target network config
import LetsGoModal, {xDai} from 'l2-letsgo-crl'
import 'l2-letsgo-crl/dist/index.css'

const provider = window.ethereum

const config = {
    targetNetwork: xDai,
    dappName: 'Example App',

    open: open,
    handleClose: handleClose,
    // optional
    address: userAddress,
    checkBalance: true,
    
  }

class Example extends Component {
  render() {
    return <LetsgoModal config={config} walletProvider={provider} />
  }
}
```

## Default theme 

To use the default theme, import the following google font your public index.html file

```html
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200&display=swap" rel="stylesheet">
```

## License

MIT © [flyingnobita](https://github.com/flyingnobita)
