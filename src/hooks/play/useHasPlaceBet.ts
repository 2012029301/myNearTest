import {useEffect, useState} from 'react'
import useSuccess from '@/hooks/common/useSuccess'
import {APP} from '@/constants/types'
import getReduxState from '@/hooks/common/getReduxState'

export default function useHasPlaceBet() {
  const [hasPlaceBet, setHasPlaceBet] = useState(false)
  const [placeBetSuccess] = useSuccess([APP.placeBet])
  const round = getReduxState(state => state.app.round)

  useEffect(() => {
    if (placeBetSuccess) {
      setHasPlaceBet(true)
    }
  }, [placeBetSuccess])

  useEffect(() => {
    if (round) {
      setHasPlaceBet(false)
    }
  }, [round])

  return hasPlaceBet
}
