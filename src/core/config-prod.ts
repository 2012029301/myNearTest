const socketUrl = 'wss:noloss-bsc.kakifi.com:8887'
const periodWaitingSecond = 35 * 60
const roundSeconds = 5 * 60
const roundFireSeconds = 180
const periodSecond = periodWaitingSecond + roundSeconds * 5
const ftmNetworkId = 0xfa
const usdAddress = ''
const twoAddress = '0x2A93a76b799fAe50ff4853fE74E31e2aBe92F300'
const iTicketAddress = '0x2339b7ab0247cB4F2D6b1B17500CbC353Ca2A9EE'
const addressListAddress = ''
const ticketInfoAddress = '0x6621e7634A235513Ed578f83E91DBa076Be19762'
const squidAddress = '0x9B4755E16d434aC8C63928bffD627e7305CC332C'
const claimLockAddress = '0x25c520C0A4438897032aeB0C15E2aF1088BEdbFd'
const farmAddress = '0xe8Ee8218DDE80329aFCEA84B42705aF2a6B8c70C'
const wftmAddress = '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83'
const airDropAddress = '0xC275522C89fc42f69c28746475d481d30111B5cb'
const presaleAddress = '0x795e63D598B2f97a93018a5410006aA88B26E4De'
const lpAddress = '0x2a93a76b799fae50ff4853fe74e31e2abe92f300'
const aprAddress = '0x2dd0257C660D6280775Fe82f7D20d3b8640a39Bb'
const twoAddressOld = '0x6AAD861a59c33497babBe7F7010e6c60968FE81c'
const farmAddressOld = '0x0d96538a0706363F17EB26e114F6381eaa5169a5'
const pathPrefix = ''
const roundCount = 5
const bscExplorerUrl = 'https://ftmscan.com'
const currentEnv: string = 'production'
const apiPrefix: string = 'https://noloss-bsc.kakifi.com/api'

export {
  socketUrl,
  periodSecond,
  periodWaitingSecond,
  roundSeconds,
  roundFireSeconds,
  ftmNetworkId,
  squidAddress,
  usdAddress,
  twoAddress,
  iTicketAddress,
  addressListAddress,
  claimLockAddress,
  farmAddress,
  pathPrefix,
  roundCount,
  bscExplorerUrl,
  ticketInfoAddress,
  currentEnv,
  apiPrefix,
  wftmAddress,
  airDropAddress,
  presaleAddress,
  lpAddress,
  aprAddress,
  twoAddressOld,
  farmAddressOld
}
