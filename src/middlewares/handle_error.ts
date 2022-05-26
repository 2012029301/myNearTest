/**
 * 处理接口请求异常
 * 501 token失效，报错action列表，重新登录成功后 重新发起action
 */

import phase from '../constants/phase'

export default ({dispatch, getState}) => next => action => {
  if (!action.type) {
    console.log(action)
  }
  if (action.type && action.type.indexOf(phase.FAILURE) !== -1) {
    // message.error(action.errorMsg)
    console.error(action.errorMsg)
  }
  try {
    return next(action)
  } finally {

  }
}
