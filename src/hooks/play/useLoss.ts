import useMyProcessList from '@/hooks/play/useMyProcessList'
import {useChapterStart} from '@/hooks/play/useGlobal'
import getReduxState from '@/hooks/common/getReduxState'

/**
 * 获取所有(global/my)Round是否loss
 *
 * @param tabType tab类型
 * @param checkRound 卡片对应轮数 如果为-1则判断当前是否有筹码
 * @param overtime 已用时间
 * @returns global、my两部分每轮是否loss状态列表
 */
export default function useLoss(): object {
  let isChapterStart = useChapterStart()
  let isBuyTicket = getReduxState(state => state.app.isBuyTicket)
  let round = getReduxState(state => state.app.round)
  let roundChip = getReduxState(state => state.app.roundChip)
  let myProcessList = useMyProcessList()

  function checkLoss(checkRound) {
    if (isChapterStart && isBuyTicket) {
      // 上一轮未放筹码 代表筹码清零 后轮都返回true
      if (checkRound > round && round > 0) {
        if (myProcessList[round - 1].call == 0 && myProcessList[round - 1].put == 0) {
          return true
        }
      }
      // 历史轮未放筹码
      if (checkRound < round && myProcessList[checkRound].call === 0 && myProcessList[checkRound].put === 0) {
        return true
      }
      // 当前轮无筹码可放
      if (checkRound == round && roundChip === 0) {
        return true
      }
      // 超时且当前轮未下筹码，暂不判断
      // if (checkRound == round && overtime > 180 && myProcessList[round].call === 0 && myProcessList[round].put === 0) {
      //   return true
      // }
    }
    return false
  }

  let myResult
  // 获取每轮的loss状态
  myResult = myProcessList.map((item, index) => {
    return checkLoss(index)
  })

  return myResult
}
