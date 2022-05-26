import 'whatwg-fetch'
import {currentEnv, apiPrefix} from '@/core/config'
import mockProvider from '@/mock-data/MockProvider'

function handleUrl(url) {
  return apiPrefix + url
}

function preHandle(url, option, method) {
  url = handleUrl(url)

  if (!method) {
    method = 'GET'
  }
  if (method == 'GET') {
    if (option) {
      let paramStr = Object.getOwnPropertyNames(option).reduce((paramStr, item, index) => {
        if (index == 0) {
          return paramStr + `${item}=${option[item]}`
        }
        return paramStr + `&${item}=${option[item]}`
      }, '?')
      url += paramStr
    }
  }

  let contentType = 'application/json;charset=utf-8'

  const request: any = {
    method: method,
    headers: {
      'Accept': 'application/json;charset=utf-8',
      'Content-Type': contentType
    }
  }
  if (option && method != 'GET') {
    request.body = JSON.stringify(option)
  }
  return {url, request}
}

function method(type) {
  if (currentEnv == 'dev') {
    return (url, option?: any) => {
      return (async () => {
        let data = await mockProvider.api(url, option)
        return {
          data
        }
      })()
    }
  }

  return function (url, option?: any) {
    let handleArg = preHandle(url, option, type)

    return new Promise<any>((resolve, reject) => {
      fetch(handleArg.url, handleArg.request).then((response: any) => {

        if (response.status == 200) {
          return response.json()
        }
        if (response.status == 500) {
          return Promise.resolve({
            code: -1, errorMsg: '服务器异常'
          })
        }
        if (response.status == 404) {
          return Promise.resolve({
            code: -1, errorMsg: '服务器不可用'
          })
        }
        return Promise.resolve({
          code: -1, errorMsg: '服务器异常'
        })
      }).then(result => {
        try {
          if (result.errorCode == 0) {
            resolve({
              data: result.data
            })
          } else {
            reject(result)
          }
        } catch (err) {
          throw err
        }
      }).catch(err => reject(err))
    })
  }
}

export let _get = method('GET')
export let _post = method('POST')
export let _put = method('PUT')
export let _patch = method('PATCH')
export let _delete = method('DELETE')
export let _head = method('HEAD')
export default method

function _bodyParam(paramObj) {
  let paramUrl = ''
  let current = 0
  for (let param in paramObj) {
    if (paramObj.hasOwnProperty(param)) {
      if (paramObj[param]) {
        let prefix = ''
        if (current++ == 0) {
          prefix = ''
        } else {
          prefix = ','
        }
        paramUrl += prefix + param + '=' + paramObj[param]
      }
    }
  }
  return encodeURI(paramUrl)
}
