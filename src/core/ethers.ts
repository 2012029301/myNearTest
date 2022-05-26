import * as ethers from 'ethers'
import {
  addressListAddress, currentEnv, iTicketAddress, ticketInfoAddress,
  squidAddress, twoAddress, usdAddress, farmAddress, claimLockAddress, presaleAddress, airDropAddress,aprAddress,farmAddressOld,twoAddressOld
} from './config'
import token from '../ABI/tokenABI.json'
import ITicketABI from '@/ABI/iTicketABI.json'
import addressListABI from '../ABI/addressListABI.json'
import ticketInfo from '@/ABI/ticketInfo.json'
import kakiSquidGame from '@/ABI/kakiSquidGame.json'
import mockProvider from '@/mock-data/MockProvider'
import WalletConnectProvider from '@walletconnect/web3-provider'
import farmABI from '@/ABI/farmABI.json'
import claimLockABI from '@/ABI/ClaimLock.json'
import presaleABI from '@/ABI/presaleABI.json'
import airDrop from '@/ABI/airDrop.json'
import aprABI from '@/ABI/aprABI.json'

let rawProvider
let provider_ether
let tokenContract
let kakiSquid_ether
let iTicket_ether
let addressList_ether
let ticket_info_ether

let farm_ether
let claimLock_ether
let presale_ether
let twoContract
let airDrop_ether
let apr_ether
let twoContractOld
let farm_etherOld

function freshProvider(type) {
  let provider
  if (currentEnv == 'dev') {
    provider = mockProvider
    rawProvider = mockProvider
    provider_ether = mockProvider
    kakiSquid_ether = mockProvider
    tokenContract = mockProvider
    iTicket_ether = mockProvider
    addressList_ether = mockProvider
    ticket_info_ether = mockProvider
    farm_ether = mockProvider
    claimLock_ether = mockProvider
    presale_ether = mockProvider
    apr_ether = mockProvider
    twoContractOld = mockProvider
    farm_etherOld = mockProvider
  } else {
    if (type == 'metamask') {
      provider = window.ethereum
      rawProvider = provider
      provider.on('chainChanged', () => {
        location.reload()
      })
      provider.on('accountsChanged', () => {
        location.reload()
      })
      window.ethereum.on('disconnect', () => {
        location.reload()
      })
    }
    if (type == 'wallet_connect') {
      provider = new WalletConnectProvider({
        rpc: {
          1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
          42161: 'https://arb1.arbitrum.io/rpc',
          4: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
          421611: 'https://rinkeby.arbitrum.io/rpc',
          97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
          56: 'https://bsc-dataseed1.binance.org',
          4002: 'https://rpc.testnet.fantom.network',
          250: 'https://rpcapi.fantom.network'
        }
      })
      rawProvider = provider
      provider.on('disconnect', () => {
        location.reload()
      })
    }
    provider_ether = new ethers.providers.Web3Provider(provider)
    kakiSquid_ether = new ethers.Contract(squidAddress, kakiSquidGame, provider_ether).connect(provider_ether.getSigner())
    tokenContract = new ethers.Contract(usdAddress, token, provider_ether).connect(provider_ether.getSigner())
    twoContract = new ethers.Contract(twoAddress, token, provider_ether).connect(provider_ether.getSigner())
    iTicket_ether = new ethers.Contract(iTicketAddress, ITicketABI, provider_ether).connect(provider_ether.getSigner())
    addressList_ether = new ethers.Contract(addressListAddress, addressListABI, provider_ether).connect(provider_ether.getSigner())
    ticket_info_ether = new ethers.Contract(ticketInfoAddress, ticketInfo, provider_ether).connect(provider_ether.getSigner())
    farm_ether = new ethers.Contract(farmAddress, farmABI, provider_ether).connect(provider_ether.getSigner())
    claimLock_ether = new ethers.Contract(claimLockAddress, claimLockABI, provider_ether).connect(provider_ether.getSigner())
    presale_ether = new ethers.Contract(presaleAddress, presaleABI, provider_ether).connect(provider_ether.getSigner())
    airDrop_ether = new ethers.Contract(airDropAddress, airDrop, provider_ether).connect(provider_ether.getSigner())
    apr_ether = new ethers.Contract(aprAddress, aprABI, provider_ether).connect(provider_ether.getSigner())
    twoContractOld = new ethers.Contract(twoAddressOld, token, provider_ether).connect(provider_ether.getSigner())
    farm_etherOld = new ethers.Contract(farmAddressOld, farmABI, provider_ether).connect(provider_ether.getSigner())
  }
  return provider
}

// 默认初始化一个provider
// freshProvider(new ethers.providers.JsonRpcProvider(rpcUrl))

export {
  freshProvider,
  rawProvider,
  provider_ether,
  tokenContract,
  kakiSquid_ether,
  iTicket_ether,
  addressList_ether,
  ticket_info_ether,
  farm_ether,
  claimLock_ether,
  airDrop_ether,
  twoContract,
  presale_ether,
  apr_ether,
  twoContractOld,
  farm_etherOld
}
