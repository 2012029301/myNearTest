import moment from 'moment'
import {useEffect, useState} from 'react'
import getReduxState from '@/hooks/common/getReduxState'

export default function useCurrentTimestamp(interval = 1000) {
  const serverTimestamp = getReduxState(state => state.app.serverTimestamp)
  const localTimestamp = getReduxState(state => state.app.localTimestamp)

  const getCurrent = (serverTimestamp) => {
    if (!localTimestamp || !serverTimestamp) {
      return null
    }
    let d = serverTimestamp + Math.ceil((moment().valueOf() - localTimestamp) / 1000)
    return d
  }

  const [value, setValue] = useState(null)

  useEffect(() => {
    setValue(getCurrent(serverTimestamp))
    let taskId = setInterval(() => {
      setValue(getCurrent(serverTimestamp))
    }, interval)
    return () => {
      clearInterval(taskId)
    }
  }, [serverTimestamp])

  return value
}
