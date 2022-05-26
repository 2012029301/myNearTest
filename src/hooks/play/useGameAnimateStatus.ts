import {useEffect, useRef, useState} from 'react'
import getReduxState from '@/hooks/common/getReduxState'
import {useChapterStart, useNextGameRemainSeconds, useRoundFireRemainSeconds, useRoundRemainSeconds} from '@/hooks/play/useGlobal'
import useLoss from '@/hooks/play/useLoss'
import useBeforeValue from '@/hooks/common/useBeforeValue'
import useMyProcess from '@/hooks/play/useMyProcess'
import {fetchMyProcess} from '@/actions/process.action'
import {roundCount} from '@/core/config'
import {APP} from '@/constants/types'
import {useDispatch} from 'react-redux'

export default function useGameAnimateStatus() {
  const [bonusLoading, setBonusLoading] = useState(false)
  const [readyShow, setReadyShow] = useState(false)
  const [countdownWarning, setCountdownWarning] = useState(false)
  const [callLose, setCallLose] = useState(false)
  const [putLose, setPutLose] = useState(false)
  const [showWinResult, setShowWinResult] = useState(false)

  const totalBonus = getReduxState(state => state.app.totalBonus)
  const isChapterStart = useChapterStart()
  const period = getReduxState(state => state.app.period)
  const round = getReduxState(state => state.app.round)

  // 当前轮是否loss
  const isLoss = useLoss()[round]
  const periodGameInfo = getReduxState(state => state.app.periodGameInfo)

  const [liveLoseChange, setLiveLoseChange] = useState(false)

  const nextGameRemainTime = useNextGameRemainSeconds()
  const canOrderRemainTime = useRoundFireRemainSeconds()
  const beforePeriod = useBeforeValue(period)
  const beforeRound = useBeforeValue(round)
  const beforePeriodMyLastRoundProcess = getReduxState(state => state.app.beforePeriodMyLastRoundProcess)

  const previousRoundMyProcess = useMyProcess(round ? round - 1 : null)

  const imageVersionRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isChapterStart && nextGameRemainTime) {
      if (nextGameRemainTime < 10) {
        setReadyShow(true)
      } else {
        setReadyShow(false)
      }
    } else {
      setReadyShow(false)
      setShowWinResult(false)
    }
  }, [nextGameRemainTime])

  useEffect(() => {
    if (isChapterStart) {
      if (canOrderRemainTime <= 30 && canOrderRemainTime > 0) {
        setCountdownWarning(true)
      } else {
        setCountdownWarning(false)
      }
    }
  }, [canOrderRemainTime])

  useEffect(() => {
    if (beforePeriod !== null) {
      dispatch(fetchMyProcess(beforePeriod, roundCount - 1, APP.fetchBeforePeriodMyLastRoundProcess))
    }
  }, [beforePeriod])

  useEffect(() => {
    if (periodGameInfo && periodGameInfo.periodStart !== true && periodGameInfo.list.length > 0) {
      setLiveLoseChange(true)
    }
  }, [periodGameInfo])

  useEffect(() => {
    if (liveLoseChange) {
      let time = setTimeout(() => {
        setLiveLoseChange(false)
      }, 20 * 1000)
      return () => clearTimeout(time)
    }
  }, [liveLoseChange])

  useEffect(() => {
    if (totalBonus >= 0) {
      setBonusLoading(true)
      let task = setTimeout(() => {
        setBonusLoading(false)
      }, 1000)
      return () => {
        clearTimeout(task)
      }
    }
  }, [totalBonus])

  useEffect(() => {
    if (previousRoundMyProcess && previousRoundMyProcess.closePrice && beforeRound !== null) {
      if (previousRoundMyProcess.closePrice <= previousRoundMyProcess.startPrice) {
        setCallLose(true)
        imageVersionRef.current = Math.random()
      } else {
        setPutLose(true)
        imageVersionRef.current = Math.random()
      }
    }
  }, [previousRoundMyProcess, beforeRound])

  useEffect(() => {
    if (beforePeriodMyLastRoundProcess && beforePeriodMyLastRoundProcess.closePrice) {
      if (beforePeriodMyLastRoundProcess.closePrice <= beforePeriodMyLastRoundProcess.startPrice) {
        setCallLose(true)
        if (beforePeriodMyLastRoundProcess.put > 0) {
          setShowWinResult(true)
        }
        imageVersionRef.current = Math.random()
      } else {
        setPutLose(true)
        if (beforePeriodMyLastRoundProcess.call > 0) {
          setShowWinResult(true)
        }
        imageVersionRef.current = Math.random()
      }
    }
  }, [beforePeriodMyLastRoundProcess])

  useEffect(() => {
    if (callLose) {
      let taskId = setTimeout(() => {
        setCallLose(false)
      }, 1000)
      return () => {
        clearTimeout(taskId)
      }
    }
    if (putLose) {
      let taskId = setTimeout(() => {
        setPutLose(false)
      }, 1000)
      return () => {
        clearTimeout(taskId)
      }
    }
  }, [callLose, putLose])

  return {
    bonusLoading,
    readyShow,
    countdownWarning,
    liveLoseChange,
    isLoss,
    imageVersion: imageVersionRef.current,
    callLose,
    putLose,
    showWinResult
  }
}
