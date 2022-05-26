import moment from 'moment'
import {periodWaitingSecond, roundCount, roundFireSeconds, roundSeconds} from '@/core/config'
import {successType} from '@/middlewares/request_3_phase'
import {APP} from '@/constants/types'
import {wsUpdateType} from '@/middlewares/websocket'

class SquidGameAuto {
  timestamp
  period
  round
  roundStartTime
  total
  call
  roundStartPrice
  fireList = []
  roundFlagList = []
  waitSeconds = periodWaitingSecond
  addAction
  nextGameTimeFlag
  started = false

  constructor(addAction, startNow?) {
    this.addAction = addAction
    this.timestamp = Math.floor(moment('2021-12-01 12:00:00').valueOf() / 1000)
    this.period = 0
    this.round = null
    this.nextGameTimeFlag = false
    this.waitSeconds = startNow ? this.waitSeconds : 100
    this.tick()
  }

  getCurrentPrice() {
    let currentPrice = 550 + (Math.random() > 0.5 ? (-10 * Math.random()) : (10 * Math.random()))
    return Number(currentPrice.toFixed(2))
  }

  tick() {
    this.addAction({
      type: wsUpdateType(APP.wsServerTimestamp),
      data: this.timestamp
    })
    setInterval(() => {
      this.timestamp += 1
      this.waitSeconds -= 1
      let currentPrice = this.getCurrentPrice()
      this.addAction({
        type: wsUpdateType(APP.wsBnbPrice),
        data: {
          price: currentPrice,
          time: this.timestamp
        }
      })
      if (this.waitSeconds >= 0) {
        this.addAction({
          type: successType(APP.fetch_nextGameTime),
          data: this.timestamp + this.waitSeconds
        })
      }

      if (this.waitSeconds < 0 && !this.started) {
        this.onStart()
      }
      if (this.timestamp > this.roundStartTime + roundSeconds) {
        this.toNextRound(currentPrice)
      }
      if (this.round !== null) {
        this.handleCurrentRound()
      }
    }, 1000)
  }

  onStart() {
    this.started = true
    this.fireList = []
    this.roundFlagList = []
    this.period++
    this.round = 0
    this.roundStartTime = this.timestamp
    this.roundStartPrice = this.getCurrentPrice()
    this.total = 16
    this.addAction({
      type: successType(APP.fetchTotalBonus),
      data: 100 + Math.floor(100 * Math.random())
    })
    this.addAction({
      type: successType(APP.fetchCurrentChapterRound),
      data: {period: this.period, round: this.round}
    })
    this.addAction({
      type: successType(APP.fetchRoundChip),
      data: this.total
    })
    this.addAction({
      type: successType(`APP__fetchMyProcess${this.round + 1}`),
      data: {call: 0, put: 0, startPrice: this.roundStartPrice, closePrice: null}
    })
    this.addAction({
      type: successType(`APP__fetchGlobalProcess${this.round + 1}`),
      data: {call: 160, put: 100, startPrice: this.roundStartPrice, closePrice: null}
    })
    this.addAction({
      type: successType(APP.fetchRoundStartTime),
      data: this.timestamp
    })
  }

  toNextRound(currentPrice) {
    let beforeRoundFireInfo = this.fireList[this.round]
    beforeRoundFireInfo.startPrice = this.roundStartPrice
    beforeRoundFireInfo.closePrice = currentPrice
    this.addAction({
      type: successType(`APP__fetchMyProcess${this.round + 1}`),
      data: {
        call: beforeRoundFireInfo.call,
        put: beforeRoundFireInfo.put,
        startPrice: beforeRoundFireInfo.startPrice,
        closePrice: beforeRoundFireInfo.closePrice
      }
    })
    this.addAction({
      type: successType(`APP__fetchGlobalProcess${this.round + 1}`),
      data: {call: 160, put: 100, startPrice: beforeRoundFireInfo.startPrice, closePrice: beforeRoundFireInfo.closePrice}
    })
    if (currentPrice > this.roundStartPrice) {
      this.total = this.call
    } else {
      this.total = this.total - this.call
    }
    this.round++
    this.roundStartPrice = currentPrice
    this.call = 0
    this.roundStartTime = this.timestamp
    if (this.round == roundCount) {
      this.toNextPeriod()
    }
    if (this.round !== null) {
      this.addAction({
        type: successType(APP.fetchRoundStartTime),
        data: this.timestamp
      })
      this.addAction({
        type: successType(APP.fetchRoundChip),
        data: this.total
      })
    }
    this.addAction({
      type: successType(APP.fetchCurrentChapterRound),
      data: {period: this.period, round: this.round}
    })
  }

  toNextPeriod() {
    this.addAction({
      type: successType(APP.fetchBeforePeriodMyLastRoundProcess),
      data: {call: 1, put: 1, startPrice: 550, closePrice: 551}
    })
    this.waitSeconds = periodWaitingSecond
    this.period++
    this.round = null
    this.started = false
  }

  handleCurrentRound() {
    if (this.timestamp > this.roundStartTime + roundFireSeconds) {
      if (!this.fireList[this.round]) {
        this.call = Math.floor(this.total * 0.6)
        this.fireList[this.round] = {total: this.total, call: this.call, put: this.total - this.call}
        this.addAction({
          type: successType(`APP__fetchMyProcess${this.round + 1}`),
          data: {call: this.call, put: this.total - this.call, startPrice: this.roundStartPrice, closePrice: null}
        })
        this.addAction({
          type: successType(`APP__fetchGlobalProcess${this.round + 1}`),
          data: {call: 100, put: 60, startPrice: this.roundStartPrice, closePrice: null}
        })
      }
    } else {
      if (!this.roundFlagList[this.round]) {
        this.roundFlagList[this.round] = true
        this.addAction({
          type: successType(`APP__fetchMyProcess${this.round + 1}`),
          data: {call: 0, put: 0, startPrice: this.roundStartPrice, closePrice: null}
        })
        this.addAction({
          type: successType(`APP__fetchGlobalProcess${this.round + 1}`),
          data: {call: 100, put: 50, startPrice: this.roundStartPrice, closePrice: null}
        })
      }
    }
  }
}

export default SquidGameAuto
