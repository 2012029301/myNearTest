import React from 'react'
import {Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import ConfigProvider from 'antd/es/config-provider'
import store, {hashHistory} from '../createStore'
import Frameset from './Frameset'
import ConfigContext from '../components/context/ConfigContext'
import {APP} from '../constants/types'
import actionList from '@/mock-data/actionList'
import {currentEnv} from '@/core/config'
import {globalSocket} from '@/middlewares/websocket'

let list = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
]

if (localStorage.getItem('unique_key') == null) {
  let uuid = ''
  for (let i = 0; i < 12; i++) {
    uuid += (list[Math.floor(Math.random() * 62)] || '-')
  }
  localStorage.setItem('unique_key', uuid)
}

store.dispatch({type: APP.init})

function mock(actionList) {
  function dispatchOne(index) {
    if (index > actionList.length - 1) {
      // console.log('mock end')
      setTimeout(() => {
        dispatchOne(index)
      }, 500)
      return
    }
    let currentAction = actionList[index]
    // console.log('action', currentAction)
    if (typeof currentAction == 'number') {
      setTimeout(() => {
        dispatchOne(index + 1)
      }, currentAction)
    } else {
      store.dispatch(currentAction)
      dispatchOne(index + 1)
    }
  }

  dispatchOne(0)
}

//@ts-ignore
window.mock = mock
//@ts-ignore
window.actionList = actionList
//@ts-ignore
window.store = store
//@ts-ignore
window.wsOnlineList = () => {
  globalSocket.addWatch('wsOnlineList', null, (data) => {
    console.log(data.filter(item => item.ip.indexOf('113.215.165.') == -1).map(item => {
      return {
        address: item.address.substring(0, 8),
        zone: item.zone,
        active: item.active
      }
    }))
    console.log(
      'total',
      data.length,
      'nft',
      data.filter(item => item.address.indexOf('nft-') != -1).length,
      'squid',
      data.filter(item => item.address.indexOf('squid-') != -1).length
    )
  })
}

const App = function () {
  const theme = {
    axisColor: '#414141',
    subAxisColor: '#414141',
    axisTextColor: '#aaa',
    axisFontSize: '#aaa'
  }

  return (
    <ConfigProvider>
      <ConfigContext.Provider value={{theme}}>
        <Provider store={store}>
          <ConnectedRouter history={hashHistory}>
            <Route>
              <Frameset/>
            </Route>
          </ConnectedRouter>
        </Provider>
      </ConfigContext.Provider>
    </ConfigProvider>
  )
}

export default App
