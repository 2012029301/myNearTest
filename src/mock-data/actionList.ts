import moment from 'moment'
import {APP} from '@/constants/types'
import {successType} from '@/middlewares/request_3_phase'
import SquidGameAuto from '@/mock-data/SquidGameAuto'

let actionList = [
  {'type': APP.init},
  {
    'type': '@@router/LOCATION_CHANGE',
    'payload': {'location': {'pathname': '/', 'search': '', 'hash': ''}, 'action': 'POP', 'isFirstRendering': true}
  },
  {
    'type': successType(APP.loginMetamask),
    'data': {'chainId': '97', 'address': '0xebb594b4e7afc089a061434e21ce3a6e4edbc5d1'}
  },
  {'type': successType(APP.fetchIsBuyTicket), 'data': true},
  {
    'type': successType(APP.fetchTokenBalance),
    'data': {'type': 'BigNumber', 'hex': '0x074c8027c8c546274000'}
  },
  {
    'type': successType(APP.fetchTicketInfo),
    'data': []
  },
  {
    'type': successType(APP.fetchUserBonus),
    'data': 0
  },
  {
    'type': successType(APP.fetchSecondsPriceList),
    'data': [
      {'id': 304944, 'price': 528.2, 'datetime': getDateTime('12:00:05')},
      {'id': 304945, 'price': 528.1, 'datetime': getDateTime('12:00:10')},
      {'id': 304946, 'price': 527.9, 'datetime': getDateTime('12:00:15')},
      {'id': 304947, 'price': 528, 'datetime': getDateTime('12:00:20')},
      {'id': 304948, 'price': 527.8, 'datetime': getDateTime('12:00:25')}
    ]
  },
  {
    'type': successType(APP.fetch_my_period_info),
    'data': [
      {'total': 10, 'datetime': getDateTime('10:00:00'), 'period': '1', 'bonus': 100},
      {'total': 8, 'datetime': getDateTime('11:00:00'), 'period': '2', 'bonus': 80},
      {'total': 4, 'datetime': getDateTime('12:00:00'), 'period': '3', 'bonus': 120},
      {'total': 2, 'datetime': getDateTime('13:00:00'), 'period': '4', 'bonus': 20},
      {'total': 0, 'datetime': getDateTime('14:00:00'), 'period': '5', 'bonus': 60},
    ]
  },
  {
    'type': successType(APP.fetch_my_period_info_detail),
    'data': [
      {startPrice: 300, closePrice: 310, call: 10, put: 6},
      {startPrice: 310, closePrice: 320, call: 8, put: 2},
      {startPrice: 320, closePrice: 330, call: 6, put: 2},
      {startPrice: 330, closePrice: 340, call: 4, put: 2},
      {startPrice: 340, closePrice: 350, call: 2, put: 2},
    ]
  }
  // {
  //   type: wsUpdateType(APP.wsSquidAddressInfoList), data: {
  //     bonus: 100,
  //     round: 5,
  //     list: [
  //       {account: '0xEbB594b4E7aFC089A061434e21cE3A6e4edbC5d1', total: 0},
  //       {account: '0xEbB594b4E7aFC089A061434e21cE3A6e4edbC5d2', total: 2},
  //       {account: '0xEbB594b4E7aFC089A061434e21cE3A6e4edbC5d3', total: 3},
  //       {account: '0xEbB594b4E7aFC089A061434e21cE3A6e4edbC5d4', total: 0},
  //       {account: '0xEbB594b4E7aFC089A061434e21cE3A6e4edbC5d5', total: 5},
  //       {account: '0xEbB594b4E7aFC089A061434e21cE3A6e4edbC5d6', total: 6},
  //       {account: '0xEbB594b4E7aFC089A061434e21cE3A6e4edbC5d7', total: 7},
  //       {account: '0xEbB594b4E7aFC089A061434e21cE3A6e4edbC5d8', total: 8},
  //       {account: '0xEbB594b4E7aFC089A061434e21cE3A6e4edbC5d9', total: 9},
  //       {account: '0xEbB594b4E7aFC089A061434e21cE3A6e4edbC5d10', total: 10},
  //     ]
  //   }
  // },
]

let actionList_noTicket = JSON.parse(JSON.stringify(actionList))
// 无票
actionList_noTicket[3].data = false
actionList_noTicket.push({
  'type': successType(APP.fetchUserBonus),
  'data': {'1,': ''}
})

let actionList_canClaim = JSON.parse(JSON.stringify(actionList))
// 能claim票
actionList_canClaim.push({
  'type': successType(APP.fetchIsInAddressList),
  'data': {
    isCanClaim: true,
    canClaimed: false
  }
})

/**
 * @param actionType 初始化页面参数
 * @param startNow 游戏是否立马开始
 */
 const mock_config = {
  actionType: actionList,
  startNow: true
}


function getDateTime(time) {
  return moment('2021-11-01 ' + time)
}

// new SquidGameAuto((action) => {
//   actionList.push(action)
// }, true)


export default actionList
