import {toTokenValue} from '@/utils/commonUtil'
import {ftmNetworkId, currentEnv, periodSecond, roundCount} from '@/core/config'
import SquidGameCore from '@/mock-data/SquidGameCore'
import {BigNumber} from 'ethers'
import store from '@/createStore'
import {wsUpdateType} from '@/middlewares/websocket'
import {APP} from '@/constants/types'
import moment from 'moment'

function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

function getDateTime(time) {
  let d = moment('2021-11-01 ' + time).valueOf()
  return d
}

class MockProvider {
  address = '0xd7dFC7e4249c40f9915E64b3D343FEC00BA525eC'
  networkVersion = ftmNetworkId
  hash
  squidGame: SquidGameCore
  callStatic

  constructor() {
    let squidGame = new SquidGameCore()
    this.squidGame = squidGame

    this.callStatic = {
      getUserBonus: async () => {
        let data = squidGame.getBonus(this.address)
        return toTokenValue(data)
      }
    }
    this.bBoxOpen().then(() => {
      // this.startGame(1).then(() => {
      //
      // })
    })
  }

  async request() {
    return ['0xd7dFC7e4249c40f9915E64b3D343FEC00BA525eC']
  }

  on(name, callback) {
  }

  async api(url, options) {
    if (url == '/second-price-history') {
      return [
        {'id': 304948, 'price': 527.8, 'datetime': getDateTime('12:00:25')},
        {'id': 304947, 'price': 528, 'datetime': getDateTime('12:00:20')},
        {'id': 304946, 'price': 527.9, 'datetime': getDateTime('12:00:15')},
        {'id': 304945, 'price': 528.1, 'datetime': getDateTime('12:00:10')},
        {'id': 304944, 'price': 528.2, 'datetime': getDateTime('12:00:05')},
      ]
    }
    if (url == '/squid/period-multiple') {
      return {multiple: 2, historyMultiple: 1}
    }
  }

  socket(type) {
    if (type == 'wsServerTimestamp') {
      store.dispatch({
        type: wsUpdateType(APP.wsServerTimestamp),
        data: this.squidGame.timestamp
      })
    }
    if (type == 'FTMBinancePrice') {
      setInterval(() => {
        store.dispatch({
          type: wsUpdateType(APP.wsBnbPrice),
          data: {
            price: this.squidGame.currentPrice,
            time: this.squidGame.timestamp
          }
        })
      }, 1000)
    }
  }

  getSigner() {
    return this
  }

  connect() {
    return this
  }

  async allowance(from, to) {
    return toTokenValue(100)
  }

  async approve(address, value) {
    return this
  }

  async isApprovedForAll(address, value) {
    return false
  }

  async setApprovalForAll(address, value) {
    return this
  }

  async wait() {
    await sleep(200)
    this.hash = Math.random() * 100
    return this
  }

  async balanceOf(address) {
    return toTokenValue(2220)
  }

  async tokensOfOwner(address) {
    let match = this.squidGame.addressTicketList.find(item => item.address == address)
    if (match) {
      return [BigNumber.from(1)]
    }
    return []
  }

  async getTicketInfo(tokenId) {
    return {
      ticketType: BigNumber.from(2)
    }
  }

  async claim() {
    return this
  }

  async addBonus() {
    await sleep(1000)
    return this
  }

  async bBoxOpen() {
    this.squidGame.buyTicket(this.address)
    await sleep(500)
    return this
  }

  async startGame(tokenId) {
    this.squidGame.useTicket(this.address)
    await sleep(500)
    return this
  }

  async placeBet(call) {
    this.squidGame.fire(this.address, call)
    await sleep(1000)
    return this
  }

  async getCurrentChapterRound() {
    let data = this.squidGame.getCurrentPeriodRound()
    return [BigNumber.from(data.period), BigNumber.from(data.round ?? roundCount)]
  }

  async getRoundChip() {
    let data = this.squidGame.getCurrentChip(this.address)
    return BigNumber.from(data)
  }

  async initChipOfOwner() {
    let data = this.squidGame.getAddressInfo(this.squidGame.period, this.address)
    return BigNumber.from(data ? 16 : 0)
  }

  async _nextGameTime() {
    let started = this.squidGame.started
    let data = this.squidGame.periodStartTime
    if (!started) {
      return BigNumber.from(data + this.squidGame.waitSeconds)
    } else {
      return BigNumber.from(data + periodSecond)
    }
  }

  async _lastRoundStartTime() {
    let data = this.squidGame.roundStartTime
    return BigNumber.from(data)
  }

  async getTotalBonus(period) {
    let data = this.squidGame.getPeriodBonus(period)
    return toTokenValue(data)
  }

  async isInAddressList(address) {
    return false
  }

  async getClaimLimit(address) {
    return BigNumber.from(1)
  }

  async getUserTokenInfo(address) {
    let ticketInfo = this.squidGame.addressTicketList.find(item => item.address == address)
    if (ticketInfo) {
      let list = []
      for (let i = 1; i <= ticketInfo.total; i++) {
        list.push({isDrop: Math.random() > 0.5, tokenId: BigNumber.from(1)})
      }
      return list
    }
    return []
  }

  async _joinNum(period) {
    return BigNumber.from(this.squidGame.getPeriodAddressInfoList(this.squidGame.period).length)
  }

  async getTotalCall(period, round) {
    let data = this.squidGame.getAddressFireInfo(period, round, this.address)
    if (data) {
      return BigNumber.from(data.call)
    }
    return BigNumber.from(0)
  }

  async getTotalPut(period, round) {
    let data = this.squidGame.getAddressFireInfo(period, round, this.address)
    if (data) {
      return BigNumber.from(data.put)
    }
    return BigNumber.from(0)
  }

  async getRoundPrice(period, round) {
    let data = this.squidGame.getPriceInfo(period, round)
    if (data) {
      return [BigNumber.from(Math.floor(data.startPrice * 100)), BigNumber.from(Math.floor(data.closePrice * 100))]
    }
    return BigNumber.from(0)
  }

  async getMyCall(period, round) {
    let data = this.squidGame.getAddressFireInfo(period, round, this.address)
    if (data) {
      return BigNumber.from(data.call)
    }
    return BigNumber.from(0)
  }

  async getMyPut(period, round) {
    let data = this.squidGame.getAddressFireInfo(period, round, this.address)
    if (data) {
      return BigNumber.from(data.put)
    }
    return BigNumber.from(0)
  }
}

let mockProvider
if (currentEnv == 'dev') {
  mockProvider = new MockProvider()
}

export default mockProvider
