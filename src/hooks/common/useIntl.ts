import {useSelector} from 'react-redux'

import {handlePlaceholder} from '../../utils/commonUtil'
import zh from '../../i18n/zh'
import en from '../../i18n/en'

export default function useIntl() {
  let language = useSelector<any, any>(state => state.app.language)
  return (key, ...args) => {
    if (language == 'zh') {
      return handlePlaceholder(zh[key] || key, args)
    }
    return handlePlaceholder(en[key] || key, args)
  }
}
