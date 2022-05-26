import {APP} from '../constants/types'
import {ftmNetworkId, iTicketAddress, roundCount, squidAddress} from '../core/config'
import {
  addressList_ether, airDrop_ether, freshProvider, iTicket_ether,
  kakiSquid_ether,
  provider_ether,
  rawProvider, ticket_info_ether,
  tokenContract, twoContract, presale_ether
} from '../core/ethers'
import {getTokenValue, toTokenValue} from '../utils/commonUtil'
import {_get} from '../utils/http'
import axios from 'axios'
import {BigNumber} from 'ethers'

export function loginMetamask() {
  return {
    type: APP.loginMetamask,
    effects: async function () {
      let provider = freshProvider('metamask')
      let accounts = await provider.request({
        method: 'eth_requestAccounts',
      })
      return {
        chainId: provider.networkVersion,
        address: accounts[0]
      }
    }
  }
}

export function loginWalletConnect() {
  return {
    type: APP.loginWalletConnect,
    effects: async function () {
      let provider = freshProvider('wallet_connect')
      let accounts = await provider.enable()
      return {
        chainId: provider.chainId,
        address: accounts[0]
      }
    }
  }
}

export function switchNetwork() {
  return {
    type: APP.add_net,
    effects: async function () {
      let chainId, name, rpcURL, blockExplorerUrl, symbol
      //@ts-ignore
      if (ftmNetworkId == 0xfa2) {
        chainId = '0xfa2'
        name = 'Fantom testnet'
        blockExplorerUrl = 'https://testnet.ftmscan.com'
        rpcURL = 'https://rpc.testnet.fantom.network/'
        symbol = 'FTM'
      }
      //@ts-ignore
      if (ftmNetworkId == 0xfa) {
        chainId = '0xfa'
        name = 'Fantom Opera'
        blockExplorerUrl = 'https://ftmscan.com'
        rpcURL = 'https://rpcapi.fantom.network/'
        symbol = 'FTM'
      }
      if (chainId) {
        window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: chainId,
              chainName: name,
              nativeCurrency: {
                name: 'Ether',
                symbol,
                decimals: 18
              },
              rpcUrls: [rpcURL],
              blockExplorerUrls: [blockExplorerUrl]
            }
          ],
        })
      }
    }
  }
}

export function addAddressToMetamask(address, symbol, decimals, image) {
  return {
    type: APP.addAddressToMetamask,
    effects: async () => {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: address,
            symbol: symbol,
            decimals: decimals,
            image: image,
          },
        },
      })
    }
  }
}

export function fetchTokenBalance(address) {
  return {
    type: APP.fetchTokenBalance,
    effects: async () => {
      let balance = await tokenContract.balanceOf(address)
      return balance
    }
  }
}

export function fetchKTokenBalance(address) {
  return {
    type: APP.fetchKTokenBalance,
    effects: async () => {
      let balance = await twoContract.balanceOf(address)
      return getTokenValue(balance)
    }
  }
}

export function bindKeyAddress(ukey, address) {
  return {
    type: APP.bindKeyAddress,
    wsType: 'twoKeyAddress',
    data: {ukey, address, once: true}
  }
}

export function sendClickEvent(clickId, detail) {
  return {
    type: APP.sendClickEvent,
    wsType: 'twoClickEvent',
    data: (state) => {
      return {
        keyId: state.app.clickAddressKeyId, ukey: localStorage.getItem('unique_key'), clickId, detail, once: true
      }
    }
  }
}

export function logout() {
  return {
    type: APP.logout,
    effects: async function () {
      try {
        await rawProvider.close()
      } catch (e) {
        console.log(e)
      }
    }
  }
}

//获取当前周期，回合，返回(uint256, uint256)   第一个返回值周期，第二个返回值回合
export function fetchCurrentChapterRound() {
  return {
    type: APP.fetchCurrentChapterRound,
    effects: async () => {
      let currentChapterRound = await kakiSquid_ether.getCurrentChapterRound()
      let round = currentChapterRound[1].toNumber()
      if (round >= roundCount) {
        round = null
      }
      return {
        period: currentChapterRound[0].toNumber(),
        round
      }
    }
  }
}

// 下单
export function placeBet(callNum) {
  return {
    type: APP.placeBet,
    effects: async () => {
      let tx = await kakiSquid_ether.placeBet(callNum)
      await tx.wait()
      return tx.hash
    }
  }
}

//  获取当前可以用的筹码
export function fetchRoundChip() {
  return {
    type: APP.fetchRoundChip,
    effects: async () => {
      // 返回自己可以用的筹码
      let myChip = await kakiSquid_ether.getRoundChip()
      return myChip.toNumber()
    }
  }
}

//获取第一回合的chip数量，来判断是否买票
export function fetchIsBuyTicket(chapter, address) {
  return {
    type: APP.fetchIsBuyTicket,
    effects: async () => {
      // 返回自己可以用的筹码
      let startRoundChip = await kakiSquid_ether.initChipOfOwner(address, chapter)
      return startRoundChip.toNumber() > 0
    }
  }
}

//获取周期开始的chips
export function fetchRoundStartChips(chapter, address) {
  return {
    type: APP.fetchRoundStartChips,
    effects: async () => {
      // 返回自己可以用的筹码
      let startRoundChip = await kakiSquid_ether.initChipOfOwner(address, chapter)
      return startRoundChip.toNumber()
    }
  }
}

// 获取大周期开始时间
export function fetch_nextGameTime() {
  return {
    type: APP.fetch_nextGameTime,
    effects: async () => {
      let time = await kakiSquid_ether._nextGameTime()
      return time.toNumber()
    }
  }
}

export function fetchRoundStartTime(chapter, round) {
  return {
    type: APP.fetchRoundStartTime,
    effects: async () => {
      let time = await kakiSquid_ether._lastRoundStartTime(chapter, round)
      return time.toNumber()
    }
  }
}

export function fetchSecondsPriceList() {
  return {
    type: APP.fetchSecondsPriceList,
    http: () => _get('/second-price-history', {type: 'ftm'}),
    handleResponse: (list: any[]) => {
      return list.reverse()
    }
  }
}

export function fetchTotalBonus(chapter) {
  return {
    type: APP.fetchTotalBonus,
    effects: async () => {
      let data = await kakiSquid_ether.getTotalBonus(chapter)
      return getTokenValue(data)
    }
  }
}

export function fetchUserBonus() {
  return {
    type: APP.fetchUserBonus,
    effects: async () => {
      let data = await kakiSquid_ether.callStatic.getUserBonus()
      return getTokenValue(data)
    }
  }
}

export function fetchClaim() {
  return {
    type: APP.claimBonus,
    effects: async () => {
      let tx = await kakiSquid_ether.claim()
      await tx.wait()
      return tx.hash
    }
  }
}

export function startWsType(actionType, wsType, data?) {
  let once = false
  if (data && data.once) {
    once = true
  }
  return {
    type: actionType,
    wsType,
    data,
    once
  }
}

//赞助商加钱
export function addBonus(address, value) {
  return {
    type: APP.addBonus,
    effects: async () => {
      let d = await tokenContract.allowance(address, squidAddress)
      if (getTokenValue(d) == 0 || getTokenValue(d) < 10000) {
        let tx = await tokenContract.approve(squidAddress, toTokenValue(1000000))
        await tx.wait()
      }
      let tx = await kakiSquid_ether.addBonus(toTokenValue(value))
      await tx.wait()
      return tx.hash
    }
  }
}

export function commitPaused(v) {
  return {
    type: APP.commitPaused,
    data: v
  }
}
export function buyTicket(address, ticketNum) {
  return {
    type: APP.buyTicket,
    effects: async () => {
      let d = await twoContract.allowance(address, iTicketAddress)
      if (getTokenValue(d) == 0 || getTokenValue(d) < 10000) {
        let tx = await twoContract.approve(iTicketAddress, toTokenValue(1000000))
        await tx.wait()
      }
      let tx = await iTicket_ether.bBoxOpen(ticketNum,{gasLimit:ticketNum*490000})
      await tx.wait()
      return tx.hash
    }
  }
}

//开盲盒
export function claimTicket() {
  return {
    type: APP.claimTicket,
    effects: async () => {
      let tx = await iTicket_ether.claim()
      await tx.wait()
      return tx.hash
    }
  }
}

//判断是否可以开票
export function fetchIsInAddressList(address) {
  return {
    type: APP.fetchIsInAddressList,
    effects: async () => {
      const signer = addressList_ether.connect(provider_ether.getSigner())
      const ticketSigner = iTicket_ether.connect(provider_ether.getSigner())
      let inWhiteList = await signer.isInAddressList(address)
      let count = await ticketSigner.getClaimLimit(address)
      return {isCanClaim: inWhiteList && count == 0, isClaimed: inWhiteList && count != 0}
    }
  }
}

//获取门票信息
export function fetchTicketInfo(address) {
  return {
    type: APP.fetchTicketInfo,
    effects: async () => {
      let list = []
      let tokenList = await ticket_info_ether.tokensOfOwner(address)
      for (let tokenId of tokenList) {
        let item = await ticket_info_ether.getTicketInfo(tokenId)

        list.push({
          tokenId: tokenId.toNumber(),
          type: item.ticketType.toNumber(),
          isDrop: false
        })
      }
      return list
    }
  }
}

//有票了游戏开始
export function useTicket(address, tokenID) {
  return {
    type: APP.useTicket,
    effects: async () => {
      let d = await ticket_info_ether.isApprovedForAll(address, squidAddress)
      if (!d) {
        let tx = await ticket_info_ether.setApprovalForAll(squidAddress, true)
        await tx.wait()
      }
      let tx = await kakiSquid_ether.startGame(tokenID)
      await tx.wait()
      return tx.hash
    }
  }
}

// memberId
export function fetchUserInfo(address) {
  return {
    type: APP.fetch_user_Info,
    http: () => _get('/squid/info', {address})
  }
}

export function fetchMyPeriodInfo(memberId) {
  return {
    type: APP.fetch_my_period_info,
    http: () => _get('/squid/my-period-info', {memberId})
  }
}

export function fetchMyPeriodInfoDetail(memberId, period) {
  return {
    type: APP.fetch_my_period_info_detail,
    http: () => _get('/squid/my-period-detail', {memberId, period})
  }
}

export function fetchPreviousPeriodMultiple() {
  return {
    type: APP.fetchPreviousPeriodMultiple,
    http: () => _get('/squid/period-multiple')
  }
}

export function fetchCurrentTicketType(address) {
  return {
    type: APP.fetchCurrentTicketType,
    effects: async () => {
      let tokenList = await ticket_info_ether.tokensOfOwner(address)
      let ticketInfo = await ticket_info_ether.getTicketInfo(tokenList[tokenList.length - 1])
      return ticketInfo.ticketType.toNumber()
    }
  }
}

export function claimAirdrop(id, amount, v, r, s) {
  return {
    type: APP.claimAirdrop,
    effects: async () => {
      console.log(id, amount, v, r, s)
      let tx = await airDrop_ether.claim(id, amount, v, r, s)
      await tx.wait()
      return tx.hash
    }
  }
}

export function fetchAirDropInfoList() {
  return {
    type: APP.fetchAirDropInfoList,
    effects: async () => {
      let list = await airDrop_ether.getAirdrops()
      return list.map((item, index) => {
        return {
          aid: index,
          count: item.count.toNumber(),
          desc: item.desc,
          endTime: item.endTime.toNumber(),
          startTime: item.startTime.toNumber(),
          // remain: item.remain.toNumber(),
          // total: item.total.toNumber()
        }
      })
    }
  }
}

export function fetchMyAirDropInfoList(address) {
  return {
    type: APP.fetchMyAirDropInfoList,
    effects: async () => {
      let data = await axios.get(`https://twochoice.vercel.app/api/two/airdrop/${address}`)
      let list = data.data || []
      // list = [{
      //   isInAllowed: true,
      //   aid: 1,
      //   amount: 100,
      //   sign: {
      //     v: 27,
      //     r: 'r',
      //     s: 's',
      //   }
      // }]
      // return list
      let result = []
      for (let item of list) {
        let d: BigNumber
        try {
          d = await airDrop_ether._claimList(item.id, address)
        } catch (e) {
          d = BigNumber.from(0)
        }
        result.push({
          isClaimed: d.gt(0),
          amount: item.amount,
          rounds: item.rounds || [],
          aid: item.id,
          v: item.sign?.v,
          r: item.sign?.r,
          s: item.sign?.s,
        })
      }
      return result
    }
  }
}

export function fetchLeftAmount() {
  return {
    type: APP.fetchLeftAmount,
    effects: async () => {
      let leftAmount = await presale_ether.getLeftAmount()
      // console.log('leftAmount', leftAmount.toNumber())
      return leftAmount
    }
  }
}

export function fetchisInSaleList(address) {
  return {
    type: APP.fetchisInSaleList,
    effects: async () => {
      let result = await presale_ether.saleList(address)
      // console.log('fetchisInSaleList', result.toNumber())
      return result.toNumber() === 0 ? 0 : 1
    }
  }
}

export function fetchisInClaimList(address) {
  return {
    type: APP.fetchisInClaimList,
    effects: async () => {
      let result = await presale_ether.claimList(address)
      // console.log('fetchisInClaimList',result)
      return result
    }
  }
}

export function checkCurrentPeriod() {
  return {
    type: APP.checkCurrentPeriod,
    effects: async () => {
      let result = await presale_ether.checkCurrentPeriod()
      return {
        wlSaleStartTime: result.wlStart.toNumber(),
        wlSaleEndTime: result.wlEnd.toNumber(),
        saleEndTime: result.saleEnd.toNumber(),
        claimStartTime: result.claimTime.toNumber(),
      }
    }
  }
}

export function fetchIsInWhiteList(address) {
  return {
    type: APP.fetchIsInWhiteList,
    effects: async () => {
      let result
      if(!address) {
        return null
      }
      await axios.get(`https://twochoice.vercel.app/api/two/presale/${address}`)
          .then(function (response) {
            if (response.status === 200) {
              // console.log('isInWhiteList', response.data)
              result = response.data
            }
          })
          .catch(function (error) {
            console.log('error', error)
          })
      return result ? result : null
    }
  }
}

export function fetchWhiteListSale(v, r, s) {
  return {
    type: APP.fetchWhiteListSale,
    effects: async () => {
      // console.log('fetchwhitelistsale', v, r, s)
      let tx = await presale_ether.whiteListSale(v, r, s, {value: toTokenValue(11), gasLimit: 500000})
      await tx.wait()
      return tx.hash
    }
  }
}

export function fetchSale() {
  return {
    type: APP.fetchSale,
    effects: async () => {
      let tx = await presale_ether.sale({value: toTokenValue(11), gasLimit: 500000})
      await tx.wait()
      return tx.hash
    }
  }
}

export function fetchPresaleClaim() {
  return {
    type: APP.fetchPresaleClaim,
    effects: async () => {
      let tx = await presale_ether.claim()
      await tx.wait()
      return tx.hash
    }
  }
}

export function fetchFtmTokenBalance(address) {
  return {
    type: APP.fetchFtmTokenBalance,
    effects: async () => {
      let ftmBalance = await provider_ether.getBalance(address)
      return getTokenValue(ftmBalance)
    }
  }
}
