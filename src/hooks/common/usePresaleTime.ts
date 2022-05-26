import {useEffect, useState} from 'react'
import getReduxState from './getReduxState'
import useCurrentTimestamp from "./useCurrentTimestamp"

export default function usePresaleTime() {
    /**
     * 预售时期
     * 0：白名单预售开始前
     * 1：白名单预售时期
     * 2：开放预售时期
     * 3：待Claim时期
     * 4：可Claim时期
     */
    const [presaleTimePeriod, setPresaleTimePeriod] = useState(0)
    const currentTimeStamp = useCurrentTimestamp()
    const currentPeriod = getReduxState(state => state.app.currentPeriod)
    
    useEffect(() => {
        if(!currentPeriod) {
            return
        }
        if(currentTimeStamp < currentPeriod.wlSaleStartTime) {
            setPresaleTimePeriod(0)
        } else if(currentTimeStamp > currentPeriod.wlSaleStartTime &&
                    currentTimeStamp < currentPeriod.wlSaleEndTime) {
            setPresaleTimePeriod(1)  
        } else if(currentTimeStamp > currentPeriod.wlSaleEndTime &&
                    currentTimeStamp < currentPeriod.saleEndTime) {
            setPresaleTimePeriod(2)  
        } else if(currentTimeStamp > currentPeriod.saleEndTime &&
                    currentTimeStamp < currentPeriod.claimStartTime) {
            setPresaleTimePeriod(3)  
        } else if(currentTimeStamp > currentPeriod.claimStartTime) {
            setPresaleTimePeriod(4)  
        }
    }, [currentTimeStamp])
    
    return presaleTimePeriod;
}