import {useSelector} from 'react-redux'
import {ReduxStateType} from '../../reducers'


export default function getReduxState(callback) {
  return useSelector<ReduxStateType, any>((state: ReduxStateType) => callback(state))
}
