import {getTokenDisplay} from '@/utils/commonUtil'
import getReduxState from '@/hooks/common/getReduxState'

/**
 * 获取用户代币balance与可购买票数
 */
export default function useBalanceAndMaxTicket() {
    const tokenBalance = getReduxState(state => state.app.twoBalance)

    let balance = tokenBalance || 0

    let maxTicket = (balance >= 222) ? Math.floor(balance / 222) : 0

    return [balance, maxTicket]
}
