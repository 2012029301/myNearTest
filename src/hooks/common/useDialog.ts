import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { APP } from '../../constants/types'

export default function useDialog(value) {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(value)

  useEffect(() => {
    if (visible) {
      dispatch({
        type: APP.add_body_class,
        data: 'blur-effect'
      })
    } else {
      dispatch({
        type: APP.delete_body_class,
        data: 'blur-effect'
      })
    }
  }, [visible])

  return [visible, setVisible]
}
