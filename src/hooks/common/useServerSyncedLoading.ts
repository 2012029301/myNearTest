import {useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import useLoading from './useLoading'
import useFail from './uesFail'

export default function useServerSyncedLoading(type, updateType) {
  const [loading, setLoading] = useState(false)

  const [frontLoading] = useLoading([type])
  const [frontFail] = useFail([type])

  useEffect(() => {
    if (frontLoading) {
      setLoading(true)
    }
  }, [frontLoading])

  useEffect(() => {
    if (frontFail && frontFail.errorCode != 0) {
      setLoading(false)
    }
  }, [frontFail])

  let updateInfo = useSelector((state: any) => {
    return state.app.updateInfo
  })

  useEffect(() => {
    if (updateInfo.type == updateType) {
      setLoading(false)
    }
  }, [updateInfo])

  return loading
}
