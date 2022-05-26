import useHasPlaceBet from '@/hooks/play/useHasPlaceBet'
import getReduxState from '@/hooks/common/getReduxState'
import useMyProcess from '@/hooks/play/useMyProcess'
import {useRoundFireRemainSeconds, useRoundStatus} from '@/hooks/play/useGlobal'
import {APP} from '@/constants/types'
import useLoading from '@/hooks/common/useLoading'

export default function useCanMoveChip() {
  const [placeBetLoading] = useLoading([APP.placeBet])
  const round = getReduxState(state => state.app.round)
  const currentMyProcess = useMyProcess(round)
  const hasPlaceBet = useHasPlaceBet()
  const roundStatus = useRoundStatus()
  const seconds = useRoundFireRemainSeconds()

  const roundChip = getReduxState(state => state.app.roundChip)
  const myCall = currentMyProcess?.call ?? null
  const myPut = currentMyProcess?.put ?? null

  return roundChip > 0 && seconds > 0 && myCall == 0 && myPut == 0 && roundStatus && !hasPlaceBet && !placeBetLoading
}
