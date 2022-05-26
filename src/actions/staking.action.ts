import moment from 'moment'
import {STAKING} from "../constants/types"
import {farmAddress} from '../core/config'
//连接钱包
import {provider_ether, farm_ether, claimLock_ether, tokenContract,apr_ether} from '../core/ethers'
import {getTokenDisplay, getTokenValue, toTokenValue} from '../utils/commonUtil'
import * as ethers from 'ethers'
import token from '@/ABI/tokenABI.json'

//Claim:
export function fetchHarvestInfo(address) {
  return {
    type: STAKING.fetchHarvestInfo,
    effects: async () => {
      const data = await claimLock_ether.getFarmAccInfo(address)
      // console.log('_fetchHarvestInfo data', data)
      let list = data?.lockedReward
      let claimableReward = data?.claimableReward
      let lockedCount = 0
      let claimableCount = 0
      let harvestData = list.map((item, i) => {
        let time = item?._currentTime?.toString()
        let harvest = getTokenValue(item?._locked)
        let claimable = getTokenValue(claimableReward[i])
        let vestingRate = (claimable / harvest * 100).toFixed(2)
        lockedCount += harvest
        claimableCount += claimable
        return {
          key: i,
          time: moment(time * 1000).format('YYYY-MM-DD HH:mm:ss'),
          harvest,
          vestingRate,
          claimable
        }
      })
      // console.log('harvestData', harvestData)
      // console.log('lockedCount', lockedCount)
      // console.log('claimableCount', claimableCount)
      return {
        harvestData,
        lockedCount: lockedCount.toFixed(2),
        claimableCount: claimableCount.toFixed(2),
      }
    }
  }
}

//Claim:Bouns-Locked
export function fetchclaimFarmReward(index) {
  return {
    type: STAKING.claimFarmReward,
    effects: async () => {
      // console.log('_claimFarmReward',index)
      const signer = claimLock_ether.connect(provider_ether.getSigner())
      const data = await signer.claimFarmReward(index, {gasLimit:1000000})
      // console.log('_claimFarmReward',data)
      return await data.wait()
    }
  }
}

//Claim:Bouns-Locked
export function fetchTradingLockedReward(address) {
  return {
    type: STAKING.fetchTradingLockedReward,
    effects: async () => {
      const data = await claimLock_ether.getTradingLockedReward(address)
      // console.log('_fetchTradingLockedReward',data)
      return getTokenValue(data)
    }
  }
}

//Claim:Bouns-Claimable
export function fetchTradingUnlockedReward(address) {
  return {
    type: STAKING.fetchTradingUnlockedReward,
    effects: async () => {
      const data = await claimLock_ether.getTradingUnlockedReward(address)
      // console.log('_fetchTradingUnlockedReward',data)
      return getTokenValue(data)
    }
  }
}

// export function fetchUserLockedTradeRewards(address) {
//   return {
//     type: STAKING.userLockedTradeRewards,
//     effects: async () => {
//       const data = await claimLock_ether._userLockedTradeRewards(address);
//       // console.log('_userLockedTradeRewards',data)
//       return data
//     }
//   }
// }
//
// export function fetchclaimTradingReward(address) {
//   return {
//     type: STAKING.claimTradingReward,
//     effects: async () => {
//       const signer = claimLock_ether.connect(provider_ether.getSigner())
//       const data = await signer.claimTradingReward(address);
//       console.log('_claimTradingReward',data)
//       return await data.wait()
//     }
//   }
// }
//Staking
export function fetchpoolInfo() {
  return {
    type: STAKING.fetchpoolInfo,
    effects: async () => {
      const data = await farm_ether.poolInfo();
      console.log('_fetchpoolInfo',data)
      return data
    }
  }
}
export function fetchInitRewardPercent() {
  return {
    type: STAKING.fetchInitRewardPercent,
    effects: async () => {
      const blockNumber = await farm_ether.provider.getBlockNumber()
      const data = await farm_ether.getInitRewardPercent(blockNumber);
      console.log('_getInitRewardPercent',data,data.toNumber())
      const value = data.toNumber()/10000 * 100
      return value
    }
  }
}
//查询当前可harvest的收益
export const getPendingReward = async (pid,address) => {
  const data = await farm_ether.pendingReward(pid,address);
  // console.log('_pendingReward',data)
  return getTokenValue(data)
}
//apr
export const getApr = async (pid) => {
  const data = await apr_ether.apr(pid);
  console.log('_Apr',data,data.toNumber())
  // return (data.toNumber()/10000*100).toFixed(2)
  return data.toNumber()
}
//DailyReward
export const getDailyReward= async (pid) => {
  const data = await farm_ether.daylyReward(pid);
  // console.log('_DailyReward',data)
  return getTokenValue(data)
}
//harvest
export function fetchHarvest() {
  return {
    type: STAKING.harvest,
    effects: async () => {
      const data = await farm_ether.harvestAll();
      // console.log('_fetchHarvest',data)
      return await data.wait()
    }
  }
}
//userInfo
export const fetchUserInfo = async (pid,address) => {
    const data = await farm_ether._userInfo(pid, address);
    const amount = data?.amount;
    const depositTime = data.depositTime.toNumber()
    console.log('_fetchUserInfo',data)
    return {
        depositTime:depositTime *1000,
        amount:getTokenValue(amount)
    }
}
//balance
export const getTotalStaked = async (tokenAddress) => {
  let tokenContract = new ethers.Contract(tokenAddress, token, provider_ether)
  let balance = await tokenContract.balanceOf(farmAddress)
  // console.log('_getTotalStaked',balance)
  return getTokenValue(balance)
}
//取款
export function fetchwithdraw(pid,amount,address,tokenAddress) {
  return {
    type: STAKING.withdraw,
    effects: async () => {
      let tokenContract = new ethers.Contract(tokenAddress, token, provider_ether)
      let d = await tokenContract.allowance(address, farmAddress)
      console.log('_fetchwithdraw-d',getTokenValue(d))
      if (getTokenValue(d) == 0 || getTokenValue(d) < 1000000) {
        const signer = tokenContract.connect(provider_ether.getSigner())
        let tx = await signer.approve(farmAddress, toTokenValue(100000000))
        console.log('_fetchwithdraw-approve',tx)
        await tx.wait()
      }
      const signer = farm_ether.connect(provider_ether.getSigner())
      console.log('_fetchwithdraw-singer',signer)
      const tx = await signer.withdraw(pid,toTokenValue(amount));
      console.log('_fetchwithdraw-data',tx)
      await tx.wait()
      return tx.hash
    }
  }
}
//存款
export function fetchdeposit(pid,amount,address,tokenAddress) {
  return {
    type: STAKING.deposit,
    effects: async () => {
      let tokenContract = new ethers.Contract(tokenAddress, token, provider_ether)
      let d = await tokenContract.allowance(address, farmAddress)
      console.log('_fetchdeposit-d',getTokenValue(d))
      if (getTokenValue(d) == 0 || getTokenValue(d) < 1000000) {
        const signer = tokenContract.connect(provider_ether.getSigner())
        let tx = await signer.approve(farmAddress, toTokenValue(100000000))
        console.log('_fetchdeposit-approve',tx)
        await tx.wait()
      }
      const signer = farm_ether.connect(provider_ether.getSigner())
      let tx = await signer.deposit(pid,toTokenValue(amount));
      console.log('_fetchdeposit-data',tx)
      await tx.wait()
      return tx.hash
    }
  }
}

// token balance
export function fetchFtmBalance(tokenAddress,address) {
  return {
    type: STAKING.ftmBalance,
    effects: async () => {
      let tokenContract = new ethers.Contract(tokenAddress, token, provider_ether)
      let balance = await tokenContract.balanceOf(address)
      // console.log('_fetchFtmBalance',balance)
      return getTokenValue(balance)
    }
  }
}
