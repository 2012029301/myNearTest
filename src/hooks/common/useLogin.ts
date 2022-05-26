import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import useDialog from '@/hooks/common/useDialog'
import useSuccess from '@/hooks/common/useSuccess'
import {APP} from '@/constants/types'
import getReduxState from '@/hooks/common/getReduxState'
import {useLocation} from 'react-router'
import {getPrefixPath} from '@/core/env'

export default function useLogin() {
  const address = getReduxState(state => state.app.address)
  const location = useLocation()
  const [showLogin, setShowLogin] = useDialog(false)

  const [loginMetamaskSuccess, loginWalletConnectSuccess] = useSuccess([APP.loginMetamask, APP.loginWalletConnect])

  useEffect(() => {
    if (loginMetamaskSuccess || loginWalletConnectSuccess) {
      setShowLogin(false)
    }
  }, [loginMetamaskSuccess, loginWalletConnectSuccess])

  useEffect(() => {
    if (location.pathname !== getPrefixPath('/')) {
      setShowLogin(address == '')
    }
  }, [address])

  return [
    showLogin,
    setShowLogin
  ]
}
