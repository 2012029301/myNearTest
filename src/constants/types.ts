
export const APP = {
  loginMetamask: null,
  loginWalletConnect: null,

  logout: null,
  init: null,

  add_body_class: null,
  delete_body_class: null,
  add_net: null,
  addAddressToMetamask: null,

  buyTicket: null,
  bindKeyAddress: null,
  sendClickEvent: null,
  placeBet: null,
  claim: null,

  fetchGlobalProcess1: null,
  fetchGlobalProcess2: null,
  fetchGlobalProcess3: null,
  fetchGlobalProcess4: null,
  fetchGlobalProcess5: null,
  fetchMyProcess1: null,
  fetchMyProcess2: null,
  fetchMyProcess3: null,
  fetchMyProcess4: null,
  fetchMyProcess5: null,
  fetchBeforePeriodMyLastRoundProcess: null,
  fetchCurrentChapterRound: null,
  fetchTokenBalance: null,
  fetchKTokenBalance: null,
  fetchRoundChip: null,
  fetchIsBuyTicket: null,
  fetchRoundStartChips:null,
  fetch_nextGameTime: null,
  fetchRoundStartTime: null,
  wsVersion: null,
  wsBnbPrice: null,
  wsServerTimestamp: null,
  wsSquidAddressInfoList: null,
  fetchHistoryPrice: null,
  fetchSecondsPriceList: null,
  fetchTotalBonus: null,
  fetchUserBonus: null,
  claimBonus: null,
  fetchPreviousTotalCall: null,
  fetchPreviousTotalPut: null,
  addBonus: null,
  commitPaused:null,
  claimTicket:null,
  fetchIsInAddressList:null,
  fetchTicketInfo:null,
  useTicket:null,
  claimFarmReward:null,
  fetchCurrentTicketType:null,
  claimAirdrop:null,
  fetchAirDropInfoList:null,
  fetchMyAirDropInfoList:null,

  fetch_user_Info:null,
  fetch_my_period_info:null,
  fetch_my_period_info_detail:null,
  fetchPreviousPeriodMultiple:null,
  wsPlaceBet: null,
  fetchLeftAmount: null,
  fetchisInSaleList: null,
  fetchisInClaimList: null,
  checkCurrentPeriod: null,
  fetchIsInWhiteList: null,
  fetchSale: null,
  fetchPresaleClaim: null,
  fetchWhiteListSale: null,
  fetchFtmTokenBalance: null
}

export const STAKING = {
  fetchHarvestInfo: null,
  fetchpoolInfo:null,
  fetchInitRewardPercent:null,
  harvest: null,
  deposit: null,
  withdraw: null,
  ftmBalance:null,
  claimFarmReward: null,
  fetchTradingLockedReward:null,
  fetchTradingUnlockedReward:null
}

generatorValueFromKey('APP', APP)
generatorValueFromKey('STAKING', STAKING)

function getActionTypeFn(prefix) {
  return function (type) {
    return prefix + '__' + type
  }
}

function generatorValueFromKey(prefix: string, obj: object): void {
  let typeFn = getActionTypeFn(prefix)
  Object.keys(obj).forEach(key => obj[key] = typeFn(key))
}
