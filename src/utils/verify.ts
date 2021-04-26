import { Config } from '../types'

export function verifyConfig(config: Config): void {
  if (config.targetNetwork.rpcUrls.length === 0)
    throw new Error('Sorbet: Plase provide RPC urls.')
}
