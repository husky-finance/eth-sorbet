export * from './constant/networks'
export * from './components/letsGoModal'

// export const LetsGo = () => {
// class LetsGo {
//   // what network is the app on
//   config: Config
//   provider: WindowChain['ethereum']

//   constructor(config: Config) {
//     this.config = config
//     const provider = (window as WindowChain).ethereum
//     if (!provider || !provider.request) {
//       throw new Error("Can't setup get Provider. window.ethereum is undefined")
//     } else {
//       this.provider = provider
//     }
//   }

//   async setupNetwork() {
//     // 1. check balance and pop notification
//     await this.checkTargetNetworkBalance()

//     // 2. add a sugest user to switch network
//     await this.switchNetwork()
//   }

//   async checkTargetNetworkBalance() {
//     // skill the check if not configed
//     if (!this.config.address || !this.config.checkBalance) return
//     const rpcProvider = new providers.JsonRpcProvider(
//       this.config.targetNetwork.rpcUrls[0]
//     )
//     const balance = await rpcProvider.getBalance(this.config.address)
//     console.log(`balance`, balance.toString())

//     if (balance.isZero()) {
//       // Todo: handle user have no L2 balance
//     }
//   }

// export default LetsGo
