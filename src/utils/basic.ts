import { ethers } from 'ethers'

import { abis } from '../contracts'

export async function getAllowance(
  provider: any,
  token: string,
  user: string,
  spender: string
) {
  const web3Provider = new ethers.providers.Web3Provider(provider)
  const tokenContract = new ethers.Contract(token, abis.erc20, web3Provider)
  return await tokenContract.allowance(user, spender)
}

export async function approve(
  provider: any,
  token: string,
  user: string,
  spender: string,
  amount: string,
  callback?: Function
) {
  const web3Provider = new ethers.providers.Web3Provider(provider)
  const tokenContract = new ethers.Contract(
    token,
    abis.erc20,
    web3Provider.getSigner()
  )
  await tokenContract.approve(spender, amount, { from: user })
  if (typeof callback === 'function')
    tokenContract.once('Approval', () => {
      callback()
    })
}
