/**
 * websocket
 */
import phase from '../constants/phase'
import {currentEnv, socketUrl} from '../core/config'
import mockProvider from '@/mock-data/MockProvider'

export function successType(type) {
  return type + phase.SUCCESS
}

class GlobalSocket {
  ws
  opened = false
  sendList = []
  list = []

  constructor() {
    this.initSocket(() => {
      this.opened = true
      this.sendList.forEach(item => {
        this.sendToServer(item.type, item.data)
      })
      this.sendList = []
    })
  }

  initSocket(openCallback) {
    try {
      this.ws = new WebSocket(socketUrl)
      this.opened = false
      this.ws.onopen = openCallback
      this.ws.onmessage = (e) => this.onMessage(e)
      this.ws.onclose = () => {
        setTimeout(() => {
          this.refreshSocket()
        }, 1000)
      }
    } catch (e) {
      setTimeout(() => {
        this.refreshSocket()
      }, 1000)
    }
  }

  refreshSocket() {
    this.initSocket(() => {
      this.opened = false
      this.list.filter(item => item.once != true).forEach(item => {
        this.sendToServer(item.type, item.data)
      })
    })
  }

  sendToServer(type, data) {
    this.ws.send(JSON.stringify({type, data}))
  }

  onMessage(e) {
    let result = JSON.parse(e.data)
    this.list.forEach(item => {
      if (item.type == result.type || item.type.indexOf(result.type) != -1)
        item.callback(result.data)
    })
  }

  addWatch(type, data, callback) {
    if (this.opened) {
      this.sendToServer(type, data)
    } else {
      this.sendList.push({type, data})
    }
    this.list.push({
      type, data, callback
    })
  }

  close(type) {
    let index = this.list.findIndex(item => item.type == type)
    this.list.splice(index, 1)
    this.sendToServer('close', type)
  }
}

const globalSocket = new GlobalSocket()

export function wsUpdateType(type) {
  return type + '_ws_update'
}

export {globalSocket}

export default ({getState}) => next => async (action: any) => {
  if (currentEnv == 'dev') {
    mockProvider.socket(action.wsType)
    return next(action)
  }
  if (!action.wsType) {
    return next(action)
  }
  if (action.wsType == 'close') {
    globalSocket.close(action.data)
    return
  }
  let actionData
  if (typeof action.data == 'function') {
    actionData = action.data(getState())
  } else {
    actionData = action.data
  }
  globalSocket.addWatch(action.wsType, actionData, (data) => {
    if (!action.onMessage) {
      return next({
        type: wsUpdateType(action.type),
        data: data
      })
    } else {
      action.onMessage(data, next)
    }
  })
}
