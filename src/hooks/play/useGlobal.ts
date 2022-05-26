import {useEffect, useRef} from 'react'
import {
  fetch_nextGameTime,
  fetchCurrentChapterRound,
  fetchIsBuyTicket, fetchKTokenBalance, fetchPreviousPeriodMultiple,
  fetchRoundChip, fetchRoundStartChips,
  fetchRoundStartTime,
  fetchSecondsPriceList,
  fetchTotalBonus, fetchUserBonus
} from '@/actions/app.action'
import {useDispatch} from 'react-redux'
import getReduxState from '@/hooks/common/getReduxState'
import useSuccess from '@/hooks/common/useSuccess'
import {APP} from '@/constants/types'
import {currentEnv, periodSecond, roundFireSeconds, roundSeconds} from '@/core/config'
import useCurrentTimestamp from '@/hooks/common/useCurrentTimestamp'
import {fetchGlobalProcess, fetchMyProcess} from '@/actions/process.action'

export function useCurrentRound() {
  const round = getReduxState(state => state.app.round)
  return round
}

export function useGameStatus() {
  const chainId = getReduxState(state => state.app.chainId)
  const address = getReduxState(state => state.app.address)
  const period = getReduxState(state => state.app.period)
  const round = getReduxState(state => state.app.round)
  const [buyTicketSuccess, useTicketSuccess] = useSuccess([APP.buyTicket, APP.useTicket])
  const [placeBetSuccess, claimSuccess, addBonusSuccess] = useSuccess([APP.placeBet, APP.claimBonus, APP.addBonus])
  const isChapterStart = useChapterStart()
  const dispatch = useDispatch()

  useEffect(() => {
    if (chainId) {
      dispatch(fetchCurrentChapterRound())
      let taskId = setInterval(() => {
        dispatch(fetchCurrentChapterRound())
      }, currentEnv == 'dev' ? 1000 : 6 * 1000)
      return () => {
        clearInterval(taskId)
      }
    }
  }, [chainId])

  useEffect(() => {
    if (address) {
      dispatch(fetchKTokenBalance(address))
    }
  }, [address])

  useEffect(() => {
    if (period !== null) {
      dispatch(fetchIsBuyTicket(period, address))
      dispatch(fetch_nextGameTime())
    }
  }, [period])

  useEffect(() => {
    if (period !== null) {
      dispatch(fetchUserBonus())
      dispatch(fetchPreviousPeriodMultiple())
      dispatch(fetchTotalBonus(period))
    }
  }, [period])

  useEffect(() => {
    if (period !== null && !isChapterStart) {
      let taskId = setInterval(() => {
        dispatch(fetchTotalBonus(period))
      }, currentEnv == 'dev' ? 5000 : 15 * 1000)
      return () => {
        clearInterval(taskId)
      }
    }
  }, [period, isChapterStart])

  useEffect(() => {
    if (round !== null) {
      dispatch(fetchRoundChip())
      dispatch(fetchSecondsPriceList())
    } else {
      dispatch(fetchSecondsPriceList())
      let taskId = setInterval(() => {
        dispatch(fetchSecondsPriceList())
      }, 5 * 60 * 1000)
      return () => {
        clearInterval(taskId)
      }
    }
  }, [round])

  useEffect(() => {
    if (period !== null && round !== null) {
      dispatch(fetchRoundStartTime(period, round))
      if (address) {
        dispatch(fetchIsBuyTicket(period, address))
        dispatch(fetchRoundStartChips(period, address))
      }
    }
  }, [period, round])

  useEffect(() => {
    if (buyTicketSuccess) {
      dispatch(fetchKTokenBalance(address))
    }
    if (useTicketSuccess) {
      dispatch(fetchIsBuyTicket(period, address))
      dispatch(fetchUserBonus())
    }
    if (claimSuccess) {
      dispatch(fetchUserBonus())
      dispatch(fetchKTokenBalance(address))
    }
    if (addBonusSuccess) {
      dispatch(fetchKTokenBalance(address))
    }
  }, [buyTicketSuccess, useTicketSuccess, placeBetSuccess, claimSuccess, addBonusSuccess])

}

export function useProcess(tabType) {
  const period = getReduxState(state => state.app.period)
  const round = getReduxState(state => state.app.round)

  const globalProcessLoadedPeriod = useRef(null)
  const myProcessLoadedPeriod = useRef(null)
  const [placeBetSuccess] = useSuccess([APP.placeBet])
  const dispatch = useDispatch()

  useEffect(() => {
    if (period !== null && round !== null) {
      if (globalProcessLoadedPeriod.current != period) {
        globalProcessLoadedPeriod.current = period
        for (let i = 0; i <= round; i++) {
          dispatch(fetchGlobalProcess(period, i))
        }
      } else {
        if (round > 0) {
          dispatch(fetchGlobalProcess(period, round - 1))
        }
        dispatch(fetchGlobalProcess(period, round))
      }
      if (myProcessLoadedPeriod.current != period) {
        myProcessLoadedPeriod.current = period
        for (let i = 0; i <= round; i++) {
          dispatch(fetchMyProcess(period, i))
        }
      } else {
        if (round > 0) {
          dispatch(fetchMyProcess(period, round - 1))
        }
        dispatch(fetchMyProcess(period, round))
      }
    }
  }, [period, round])

  useEffect(() => {
    if (period !== null && round !== null) {
      let taskId = setInterval(() => {
        dispatch(fetchGlobalProcess(period, round))
      }, 5 * 1000)
      return () => {
        clearInterval(taskId)
      }
    }
  }, [period, round])

  useEffect(() => {
    if (placeBetSuccess) {
      if (tabType == 'global') {
        dispatch(fetchGlobalProcess(period, round))
      }
      if (tabType == 'my') {
        dispatch(fetchMyProcess(period, round))
      }
    }
  }, [placeBetSuccess])

}

export function useChapterStart() {
  const round = getReduxState(state => state.app.round)
  let roundStartTime = getReduxState(state => state.app.roundStartTime)
  if (round === 0 && roundStartTime == 0) {
    return false
  }
  return round !== null
}

export function useRoundStatus() {
  let seconds = useRoundRemainSeconds()
  if (!seconds) {
    return false
  }
  return seconds > 0
}

export function useGlobalAliveChip() {
  const periodGameInfo = getReduxState(state => state.app.periodGameInfo)
  const addressInfoList = periodGameInfo?.list || []
  let alive = addressInfoList?.reduce((result, item) => result + item.total, 0)
  return alive
}

export function useGlobalDeadChip() {
  const periodGameInfo = getReduxState(state => state.app.periodGameInfo)
  const addressInfoList = periodGameInfo?.list || []
  let total = addressInfoList?.length * 16
  let alive = addressInfoList?.reduce((result, item) => result + item.total, 0)
  return total - alive
}

export function useGlobalAlivePlayer() {
  const periodGameInfo = getReduxState(state => state.app.periodGameInfo)
  const addressInfoList = periodGameInfo?.list || []
  let alive = addressInfoList?.reduce((result, item) => result + item.total, 0)
  return alive
}

export function useGlobalDeadPlayer() {
  const periodGameInfo = getReduxState(state => state.app.periodGameInfo)
  const addressInfoList = periodGameInfo?.list || []
  let total = addressInfoList?.length * 16
  let alive = addressInfoList?.reduce((result, item) => result + item.total, 0)
  return total - alive
}

export function useNextGameRemainSeconds() {
  const isChapterStart = useChapterStart()
  const nextGameTime = getReduxState(state => state.app.nextGameTime)
  const currentTime = useCurrentTimestamp()
  if (!nextGameTime || !currentTime) {
    return null
  }

  let nextGameRemainTime = nextGameTime - currentTime
  if (isChapterStart) {
    nextGameRemainTime = periodSecond - (currentTime - nextGameTime)
  }
  return nextGameRemainTime
}

export function useRoundPassedSeconds() {
  let roundStartTime = getReduxState(state => state.app.roundStartTime)
  const currentTime = useCurrentTimestamp()
  if (!roundStartTime || !currentTime) {
    return null
  }
  return currentTime - roundStartTime
}

//round剩余时间
export function useRoundRemainSeconds() {
  let passed = useRoundPassedSeconds()
  let d = roundSeconds - passed
  if (d <= 0) {
    return 0
  }
  return d
}

//下单剩余时间
export function useRoundFireRemainSeconds() {
  let passed = useRoundPassedSeconds()
  let d = roundFireSeconds - passed
  if (d <= 0) {
    return 0
  }
  return d
}
