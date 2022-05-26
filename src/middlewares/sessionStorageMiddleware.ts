import {APP} from '../constants/types'
import {loginMetamask, loginWalletConnect} from '../actions/app.action'
import WalletConnectProvider from '@walletconnect/web3-provider'
import {freshProvider} from '../core/ethers'
import phase from '../constants/phase'

let lastLoginTypeKey = 'lastLoginType'

const sessionStorageMiddleware = ({dispatch, getState}) => next => action => {
  // const state: ReducerType = getState()
  // console.log(action.type, '---', action)
  if (action.type == APP.init) {
    let lastLoginType = sessionStorage.getItem(lastLoginTypeKey)
    if (lastLoginType == '1') {
      if (window.ethereum) {
        dispatch(loginMetamask())
      }
    }
    if (lastLoginType == '2') {
      dispatch(loginWalletConnect())
    }
  }
  if (action.type == APP.logout + phase.SUCCESS) {
    sessionStorage.setItem(lastLoginTypeKey, '')
  }
  if (action.type == APP.loginMetamask + phase.SUCCESS) {
    sessionStorage.setItem(lastLoginTypeKey, '1')
  }
  if (action.type == APP.loginWalletConnect + phase.SUCCESS) {
    sessionStorage.setItem(lastLoginTypeKey, '2')
  }
  return next(action)
}

export default sessionStorageMiddleware
