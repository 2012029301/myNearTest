import {APP, STAKING} from '@/constants/types'
import {successType} from '@/middlewares/request_3_phase'

let list = []

export default ({dispatch, getState}) => next => action => {
  // const state: ReducerType = getState()
  // console.log(action.type, '---', action)
  if (location.href.indexOf('debug=1') != -1) {
    list.push(action)
  }
  let clickId
  let detail
  if (action.type == successType(APP.claimAirdrop)) {
    clickId = 9900
    detail = 'claimAirdrop success'
  }
  if (action.type == successType(APP.fetchSale)) {
    clickId = 9901
    detail = 'buy two success'
  }
  if (action.type == successType(APP.buyTicket)) {
    clickId = 9902
    detail = 'buy ticket success'
  }
  if (action.type == successType(STAKING.deposit)) {
    clickId = 9903
    detail = 'deposit success'
  }
  if (action.type == successType(STAKING.withdraw)) {
    clickId = 9904
    detail = 'withdraw success'
  }
  if (action.type == successType(STAKING.harvest)) {
    clickId = 9905
    detail = 'harvest success'
  }
  if (clickId) {
    let state = getState()
    dispatch({
      type: APP.sendClickEvent,
      wsType: 'twoClickEvent',
      data: {
        keyId: state.app.clickAddressKeyId,
        ukey: localStorage.getItem('unique_key'),
        clickId,
        detail,
        once: true
      }
    })
  }

  return next(action)
}

//@ts-ignore
window.printActionList = () => {
  console.log(list)
  console.log(JSON.stringify(list))
}
