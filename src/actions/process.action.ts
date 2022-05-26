import {APP} from '@/constants/types'
import {kakiSquid_ether, provider_ether} from '@/core/ethers'

export function fetchGlobalProcess(period, round) {
  let type
  if (round == 0) {
    type = APP.fetchGlobalProcess1
  }
  if (round == 1) {
    type = APP.fetchGlobalProcess2
  }
  if (round == 2) {
    type = APP.fetchGlobalProcess3
  }
  if (round == 3) {
    type = APP.fetchGlobalProcess4
  }
  if (round == 4) {
    type = APP.fetchGlobalProcess5
  }
  return {
    type,
    effects: async () => {
      let res = await Promise.all([
        await kakiSquid_ether.getTotalCall(period, round),
        await kakiSquid_ether.getTotalPut(period, round),
        await kakiSquid_ether.getRoundPrice(period, round),
      ])
      let totalCall = res[0]
      let totalPut = res[1]
      let startPrice = res[2][0]
      let endPrice = res[2][1]
      return {
        call: totalCall.toNumber(),
        put: totalPut.toNumber(),
        startPrice: startPrice.toNumber() / 100 || null,
        closePrice: endPrice.toNumber() / 100 || null
      }
    }
  }
}

export function fetchMyProcess(period, round, actionType?) {
  let type
  if (round == 0) {
    type = APP.fetchMyProcess1
  }
  if (round == 1) {
    type = APP.fetchMyProcess2
  }
  if (round == 2) {
    type = APP.fetchMyProcess3
  }
  if (round == 3) {
    type = APP.fetchMyProcess4
  }
  if (round == 4) {
    type = APP.fetchMyProcess5
  }
  return {
    type: actionType|| type,
    effects: async () => {
      const signer = kakiSquid_ether.connect(provider_ether.getSigner())
      let res = await Promise.all([
        await signer.getMyCall(period, round),
        await signer.getMyPut(period, round),
        await signer.getRoundPrice(period, round),
      ])
      let totalCall = res[0]
      let totalPut = res[1]
      let startPrice = res[2][0]
      let endPrice = res[2][1]

      return {
        call: totalCall.toNumber(),
        put: totalPut.toNumber(),
        startPrice: startPrice.toNumber() / 100 || null,
        closePrice: endPrice.toNumber() / 100 || null
      }
    }
  }
}
