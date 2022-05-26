import {BigNumber} from 'ethers'
import {message} from 'antd'

import zh from '../i18n/zh'
import en from '../i18n/en'
import moment from 'moment'

let uid = 1

export function getDateStr(datetime, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!datetime) {
    return ''
  }
  return moment(datetime).format(format)
}

export async function delay(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, seconds)
  })
}

export function tipSuccess(content) {
  message.success(
    {
      content: content,
      //    style: {
      //   marginTop: '20vh',
      // },
    })

}

export function getUid() {
  return uid++
}

export function getLocalUid() {
  return 'local_' + uid++
}

export function stringToNumber(str) {
  if (str == null) {
    return str
  }
  return parseInt(str)
}

export function getTokenValue(v, precision = 2, tokenLength = 18) {
  let d = getTokenDisplay(v, precision, tokenLength)
  if (d !== null) {
    return Number(d)
  }
  return null
}

export function getTokenDisplay(d, precision = 2, tokenLength = 18): number {
  if (!d) {
    return null
  }
  if (typeof d == 'string') {
    d = BigNumber.from(d)
  }
  //bignumber 无法处理小数，除以16个0，再除以100
  let divStr = '1'
  for (let i = 1; i <= tokenLength - precision; i++) {
    divStr += '0'
  }
  try {
    // let result = d.div(BigNumber.from(divStr)).toNumber()
    let result = BigNumber.from(d).div(BigNumber.from(divStr)).toNumber()
    if (result !== null && result !== undefined) {
      return Number((result / Math.pow(10, precision)).toFixed(precision))
    }
    return null
  } catch (e1) {
    if (e1.reason == 'overflow' && e1.code == 'NUMERIC_FAULT') {
      try {
        return d.div(BigNumber.from('1000000000000000000')).toNumber()
      } catch (e2) {
        if (e2.reason == 'overflow' && e2.code == 'NUMERIC_FAULT') {
          return Number(e2.value)
        }
      }
    }
  }
}

export function nice(v, precision = 0): number {
  if (v === null || v === undefined) {
    return null
  }
  if (v === 0) {
    return 0
  }
  if (isNaN(v)) {
    return null
  }
  try {
    if (typeof v === 'string') {
      try {
        return Number(Number(v).toFixed(precision))
      } catch (e) {
        return Number(v)
      }
    }
    return Number(v.toFixed(precision))
  } catch (_) {
    return null
  }
}

export function toTokenValue(value, length = 18) {
  if (!value) {
    return null
  }
  let divStr = '1'
  for (let i = 1; i <= length; i++) {
    divStr += '0'
  }
  return BigNumber.from(Math.floor(value * 100)).mul(BigNumber.from(divStr)).div(100).toString()
}

export function handlePlaceholder(str: string, args = []) {
  let index = 0
  return str.replace(/({\$})/g, (s, placeholder) => {
    return args[index++] || ''
  })
}

export function intl(key, ...args) {
  let language = localStorage.getItem('language') || 'zh'
  if (language == 'zh') {
    return handlePlaceholder(zh[key] || key, args)
  }
  if (language == 'en') {
    return handlePlaceholder(en[key] || key, args)
  }
}

export function noChineseNormalize(value) {
  return value.replace(/[\u4e00-\u9fa5]/g, '')
}

export function copy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

interface ValueName {
  value: number
  name: string
}

export function getOptions(list): ValueName[] {
  return list.map(item => {
    if (item instanceof Array) {
      return {
        value: item[0],
        name: item[1]
      }
    }
    return {
      value: item,
      name: item + ''
    }
  })
}

export function triggerEvent(eventName, target) {
  const myEvent = new Event(eventName)
  target.dispatchEvent(myEvent)
}

export function niceDisplayNumber(n, precision) {
  if (n == null) {
    return n
  }
  if (n == Math.floor(n)) {
    return n
  }
  return n.toFixed(precision)
}

export function getPercent(value, num = 0) {
  if (isNaN(value)) {
    return 0
  }
  return ((value || 0) * 100).toFixed(num)
}

export function toMoney(num) {
  let result = parseFloat(num)
  if (isNaN(result)) {
    // alert('传递参数错误，请检查！')
    return false
  }
  result = Math.round(num * 100) / 100
  let s_x = result.toString()
  let pos_decimal = s_x.indexOf('.')
  if (pos_decimal < 0) {
    pos_decimal = s_x.length
    s_x += '.'
  }
  while (s_x.length <= pos_decimal + 2) {
    s_x += '0'
  }
  return s_x
}

export function moneyTonumber(str) {
  if (str.length >= 4) {
    let arr = str.split(',')
    console.log(arr)
    return parseFloat(arr.join(''))
  } else {
    return str
  }
}

export function numberToString(num) {
  if (num > 999) {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else {
    return num
  }
}

export function rounding(num) {
  return (Number(Math.round(num)))
}

//累加
export function totalNum(list: any[], key: string) {
  const all = list?.reduce((pre, item) => {
    return pre + item[key]
  }, 0)
  return all
}

export function fetchTime(seconds) {
  let timeArr = [0, 0, 0, 0, 0, 0, 0, 0]
  let days = Math.floor(seconds / (60 * 60 * 24))
  let hours = (Math.floor(seconds % (60 * 60 * 24) / (60 * 60))).toString().padStart(2, '0')
  let minute = (Math.floor(seconds % (60 * 60) / 60)).toString().padStart(2, '0')
  let second = (seconds % 60).toString().padStart(2, '0')
  if (days > 10) {
    timeArr[0] = Math.floor((days / 10))
    timeArr[1] = days % 10
  } else {
    timeArr[1] = days % 10
  }
  if (Number(hours) > 10) {
    timeArr[2] = Math.floor((Number(hours) / 10))
    timeArr[3] = Number(hours) % 10
  } else {
    timeArr[3] = Number(hours) % 10
  }
  if (Number(minute) > 10) {
    timeArr[4] = Math.floor((Number(minute) / 10))
    timeArr[5] = Number(minute) % 10
  } else {
    timeArr[5] = Number(minute) % 10
  }
  if (Number(second) > 10) {
    timeArr[6] = Math.floor((Number(second) / 10))
    timeArr[7] = Number(second) % 10
  } else {
    timeArr[7] = Number(second) % 10
  }
  return timeArr
}

export function fetchHours(seconds) {
  let hours = Math.floor(seconds / 60 / 60)
  return hours
}

export function isEmpty(value) {
  return value === null || value === undefined
}

export function range(n) {
  if (!n) {
    return []
  }
  let list = []
  for (let i = 1; i <= n; i++) {
    list.push(i)
  }
  return list
}
