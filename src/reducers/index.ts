import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'

import {APP,STAKING} from '../constants/types'
import {error, loading, success} from '../utils/reduxUtil'
import data from './data.reducer'
import {wsUpdateType} from '../middlewares/websocket'
import moment from 'moment'

export interface ReduxStateType {
  app: any
  loading: any
  success: any
  error: any
}

function simple(type, value) {
  return (state = value, action) => {
    if (action.type == type) {
      return action.data
    }
    return state
  }
}

function socket(type, value) {
  return (state = value, action) => {
    if (action.type == wsUpdateType(type)) {
      return action.data
    }
    return state
  }
}

function appClasses(state = [], action) {
  if (action.type == APP.add_body_class) {
    return [...state, action.data]
  }
  if (action.type == APP.delete_body_class) {
    let newState = state.slice(0)
    if (newState.indexOf(action.data) != -1) {
      newState.splice(newState.indexOf(action.data), 1)
      return newState
    }
  }
  return state
}

let initProcessItem = {call: null, put: null, startPrice: null, closePrice: null}
let initProcessList = [
  initProcessItem,
  initProcessItem,
  initProcessItem,
  initProcessItem,
  initProcessItem
]

export {initProcessList}

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  app: combineReducers({
    chainId: data([APP.loginMetamask, APP.loginWalletConnect], '', data => data.chainId),
    address: data([APP.loginMetamask, APP.loginWalletConnect], '', data => data.address),
    serverTimestamp: socket(APP.wsServerTimestamp, null),
    clickAddressKeyId: socket(APP.bindKeyAddress, null),
    localTimestamp: localTimestamp,
    appClasses: appClasses,

    usdBalance: data(APP.fetchTokenBalance, null),
    twoBalance: data(APP.fetchKTokenBalance, null),
    globalProcess1: data(APP.fetchGlobalProcess1, initProcessItem),
    globalProcess2: data(APP.fetchGlobalProcess2, initProcessItem),
    globalProcess3: data(APP.fetchGlobalProcess3, initProcessItem),
    globalProcess4: data(APP.fetchGlobalProcess4, initProcessItem),
    globalProcess5: data(APP.fetchGlobalProcess5, initProcessItem),
    myProcess1: data(APP.fetchMyProcess1, initProcessItem),
    myProcess2: data(APP.fetchMyProcess2, initProcessItem),
    myProcess3: data(APP.fetchMyProcess3, initProcessItem),
    myProcess4: data(APP.fetchMyProcess4, initProcessItem),
    myProcess5: data(APP.fetchMyProcess5, initProcessItem),
    beforePeriodMyLastRoundProcess: data(APP.fetchBeforePeriodMyLastRoundProcess, null),

    // 判断周期是否开始
    currentChapterRound: data(APP.fetchCurrentChapterRound, null),
    //拆分period，round
    period: data(APP.fetchCurrentChapterRound, null, data => data.period),
    round: data(APP.fetchCurrentChapterRound, null, data => data.round),
    // 当前周期的回合
    roundChip: data(APP.fetchRoundChip, null),
    isBuyTicket: data(APP.fetchIsBuyTicket, null),
    roundStartChips:data(APP.fetchRoundStartChips,null),
    nextGameTime: data(APP.fetch_nextGameTime, null),
    previousTotalCall: data(APP.fetchPreviousTotalCall, null),
    previousTotalPut: data(APP.fetchPreviousTotalPut, null),

    bnbPrice: socket(APP.wsBnbPrice, null),
    periodGameInfo: socket(APP.wsSquidAddressInfoList, null),
    roundStartTime: data(APP.fetchRoundStartTime, null),
    priceHistoryList: data(APP.fetchHistoryPrice, []),
    secondPriceList: data(APP.fetchSecondsPriceList, []),
    totalBonus: data(APP.fetchTotalBonus, 0),
    userBonus: data(APP.fetchUserBonus, 0),

    paused: simple(APP.commitPaused, true),

    IsInAddressList: data(APP.fetchIsInAddressList, null),
    ticketList: data(APP.fetchTicketInfo, []),
    currentTicketType:data(APP.fetchCurrentTicketType,null),
    urlInfo: data([APP.buyTicket, APP.placeBet, APP.claimBonus, APP.addBonus,APP.useTicket], null),

    userInfo:data(APP.fetch_user_Info,null),
    myPeriodInfoList:data(APP.fetch_my_period_info,[]),
    myPeriodInfoDetail:data(APP.fetch_my_period_info_detail,[]),
    historyMultipleInfo:data(APP.fetchPreviousPeriodMultiple, {multiple: 0, historyMultiple: 0}),
    poolInfo: data(STAKING.fetchpoolInfo, null),
    initRewardPercent: data(STAKING.fetchInitRewardPercent, null),
    harvest: data(STAKING.harvest, null),
    ftmBalance: data(STAKING.ftmBalance, null),
    harvestInfo: data(STAKING.fetchHarvestInfo, null),
    
    leftAmount: data(APP.fetchLeftAmount, null),
    isInSaleList: data(APP.fetchisInSaleList, null),
    isInClaimList: data(APP.fetchisInClaimList, null),
    currentPeriod: data(APP.checkCurrentPeriod, null),
    saleInfo: data(APP.fetchSale, null),
    presaleClaim: data(APP.fetchPresaleClaim, null),
    isInWhiteList: data(APP.fetchIsInWhiteList, null),
    whiteListSaleInfo: data(APP.fetchWhiteListSale, null),
    ftmTokenBalance: data(APP.fetchFtmTokenBalance, null),

    airdropList: data(APP.fetchAirDropInfoList, []),
    myAirdropList: data(APP.fetchMyAirDropInfoList, []),
  }),
  loading,
  success,
  error,
})

export default createRootReducer

function localTimestamp(state = null, action) {
  if (action.type == wsUpdateType(APP.wsServerTimestamp)) {
    return moment().valueOf()
  }
  return state
}
