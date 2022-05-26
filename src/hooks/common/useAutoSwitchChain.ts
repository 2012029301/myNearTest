import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useLocation} from 'react-router'
import {getPrefixPath} from '@/core/env'

export default function useAutoSwitchChain(chainId, targetChainId, switchNetwork) {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname == getPrefixPath('/') || location.pathname == getPrefixPath('/airdrop')) {
      return
    }
    if (chainId && chainId != targetChainId && (document.visibilityState && document.visibilityState == 'visible')) {
      dispatch(switchNetwork())
    }
  }, [chainId, location])
}
