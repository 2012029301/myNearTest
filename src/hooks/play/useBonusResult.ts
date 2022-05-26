import getReduxState from '@/hooks/common/getReduxState'
import {useEffect, useState} from 'react'
import {roundCount} from '@/core/config'

export default function useBonusResult() {
  const periodGameInfo = getReduxState(state => state.app.periodGameInfo)

  const totalBonus = periodGameInfo?.bonus || 0
  const addressInfoList = periodGameInfo?.list || []

  let globalTotalChip = addressInfoList?.reduce((result, item) => result + (item.ticketType == 0 ? 16 : 32), 0)
  let globalAliveChip = addressInfoList?.reduce((result, item) => result + item.total, 0)

  let liveNumList = []
  if (addressInfoList) {
    liveNumList = addressInfoList?.filter(item => item.total > 0)
  }
  let alivePlayerCount = liveNumList.length
  let lossPlayerCount = addressInfoList?.length - alivePlayerCount
  let maxChip = 0
  let maxChipList = []

  let totalChipList = addressInfoList.map((item) => item.total)

  if (totalChipList.length > 0) {
    maxChip = Math.max(...totalChipList)
    if (maxChip > 0) {
      maxChipList = liveNumList.filter((item) => maxChip == item.total)
    }
  }

  const [showBonusTip, setShowBonusTip] = useState(false)

  useEffect(() => {
    if (periodGameInfo && periodGameInfo.round == roundCount) {
      setShowBonusTip(true)
    }
  }, [periodGameInfo])

  useEffect(() => {
    if (showBonusTip) {
      let time = setTimeout(() => {
        setShowBonusTip(false)
      }, 20 * 1000)
      return () => clearTimeout(time)
    }
  }, [showBonusTip])

  return {
    totalBonus,
    globalTotalChip,
    globalAliveChip,
    globalPlayerCount: addressInfoList.length,
    alivePlayerCount,
    lossPlayerCount,
    maxChipList,
    showBonusTip
  }
}
