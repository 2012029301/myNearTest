const socketUrl = 'wss:noloss-bsc-test.kakifi.com:8887'
const periodWaitingSecond = 35 * 60
const roundSeconds = 5 * 60
const roundFireSeconds = 180
const periodSecond = periodWaitingSecond + roundSeconds * 5
const ftmNetworkId = 0xfa2
const usdAddress = ''
const twoAddress = '0x0F84B014FeD7ADF7EF49d26A659b5bbcFb8750BA'
const iTicketAddress = '0xB03f96EB6b97A00897E6e3a60fc628FbF40DA575'
const addressListAddress = '0xad6d691fdd595D747F30f5b0C4f05d7d1E59B9F6'
const ticketInfoAddress = '0x35604605628691F5285CaBb71250829AcE6C0651'
const squidAddress = '0x47Ab09E6D79983b71795ffA3253e50221d5c8f5B'
const claimLockAddress = '0x70F50f6F190c939576b263c87D6bacBBc9f9F08c'
const farmAddress = '0x009ee80f190DE5e3933CA87D2793F72e639AbDDf'
const wftmAddress = '0x432247280466bf16537dcE5817b24Ee945F3E43E'
const airDropAddress = '0x82b2866Cd7C16CDbe9710B601f8D7755080E5bd5'
const presaleAddress = '0xdd3BB41FBDED44e81376042A0Aa90766495c42b3'
const lpAddress = '0x2a93a76b799fae50ff4853fe74e31e2abe92f300'
const aprAddress = '0x2dd0257C660D6280775Fe82f7D20d3b8640a39Bb'
const twoAddressOld = '0x6AAD861a59c33497babBe7F7010e6c60968FE81c'
const farmAddressOld = '0x0d96538a0706363F17EB26e114F6381eaa5169a5'
const pathPrefix = ''
const roundCount = 5
const bscExplorerUrl = 'https://testnet.ftmscan.com'
const currentEnv: string = 'test'
const apiPrefix: string = 'https://noloss-bsc-test.kakifi.com/api'

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
