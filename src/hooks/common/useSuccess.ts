import {useSelector} from 'react-redux'

export default function useSuccess(types) {
  let successInfo = useSelector((state: any) => {
    return state.success
  })
  return types.map(item => {
    return successInfo[item] || false
  })
}
