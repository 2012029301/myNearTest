import {useSelector} from 'react-redux'

export default function useLoading(types) {
  let loadingInfo = useSelector((state: any) => {
    return state.loading
  })
  return types.map(item => {
    return loadingInfo[item] || false
  })
}
