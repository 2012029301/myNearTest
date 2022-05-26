import moment from 'moment'
import useGlobalProcess from '@/hooks/play/useGlobalProcess'
import getReduxState from '@/hooks/common/getReduxState'
import {useEffect, useState} from 'react'
import {roundSeconds} from '@/core/config'

export default function useCurrentRoundChartData() {
  let [priceList, setPriceList] = useState([])

  let bnbPrice = getReduxState(state => state.app.bnbPrice)
  const round = getReduxState(state => state.app.round)
  let roundStartTime = getReduxState(state => state.app.roundStartTime)
  const secondPriceList = getReduxState(state => state.app.secondPriceList)
  let currentGlobalProcess = useGlobalProcess(round) || {}

  let finallyPriceList = []

  useEffect(() => {
    if (bnbPrice) {
      if (bnbPrice.time < roundStartTime + roundSeconds) {
        setPriceList([...priceList, {x: bnbPrice.time * 1000, y: getNumber(bnbPrice.price)}])
      }
    }
  }, [bnbPrice])

  useEffect(() => {
    setPriceList([])
  }, [round])

  const getNumber = (d) => {
    if (d === null) {
      return d
    }
    if (typeof d == 'string') {
      d = Number(d)
    }
    try {
      return Number(d?.toFixed(4))
    } catch (e) {
      return null
    }
  }

  if (currentGlobalProcess.startPrice) {
    finallyPriceList.push({x: roundStartTime * 1000, y: currentGlobalProcess.startPrice})
    for (let i = 0; i < secondPriceList.length; i++) {
      let item = secondPriceList[i]
      let d = Math.floor(moment(item.datetime).valueOf() / 1000)
      if (d > roundStartTime && d < roundStartTime + roundSeconds) {
        finallyPriceList.push({x: d * 1000, y: getNumber(item.price)})
      }
    }

    if (priceList) {
      finallyPriceList = [...finallyPriceList, ...priceList, {x: (roundStartTime + roundSeconds) * 1000, y: null}]
    }
  }
  return finallyPriceList
}
