import { useState, useEffect } from "react"
import getReduxState from "./getReduxState"
import useCurrentTimestamp from "./useCurrentTimestamp"
import usePresaleTime from "./usePresaleTime"

/**
 * 获取倒计时时间
 */
export default function usePresaleCountDown() {
    let time
    let [resultTime, setResultTime] = useState(null)
    const currentTimeStamp = useCurrentTimestamp()
    const currentPeriod = getReduxState(state => state.app.currentPeriod)
    const isInSaleList = getReduxState(state => state.app.isInSaleList)
    const presaleTimePeriod = usePresaleTime()

    useEffect(() => {
        if(!currentPeriod || isInSaleList) {
            return
        }
        if(presaleTimePeriod >= 1) {
            if(!resultTime) {
                return
            }
            setResultTime(null)
        }
        if(presaleTimePeriod === 0) {
            time = currentPeriod.wlSaleStartTime - currentTimeStamp
            if(time >= 0) {
                let d= Math.floor(time/60/60/24) + 'd '
                let h= Math.floor(time/60/60%24) + ':'
                let m= Math.floor(time/60%60) + ':'
                let s= Math.floor(time%60)
                setResultTime(' (' + d + h + m + s + ')')
            } else {
                setResultTime(null)
            }
        }
    }, [currentTimeStamp])

    return resultTime
}
