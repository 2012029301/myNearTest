import {useSelector} from 'react-redux'

export default function useFail(types) {
  let failInfo = useSelector((state: any) => {
    return state.error
  })
  return types.map(item => { 
    return failInfo[item]|| false
  })
}
