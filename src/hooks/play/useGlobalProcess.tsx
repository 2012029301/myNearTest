import getReduxState from '@/hooks/common/getReduxState'

export default function useGlobalProcess(round) {
  const globalProcess1 = getReduxState(state => state.app.globalProcess1)
  const globalProcess2 = getReduxState(state => state.app.globalProcess2)
  const globalProcess3 = getReduxState(state => state.app.globalProcess3)
  const globalProcess4 = getReduxState(state => state.app.globalProcess4)
  const globalProcess5 = getReduxState(state => state.app.globalProcess5)

  let previousRoundMyProcess
  if (round == 0) {
    previousRoundMyProcess = globalProcess1
  }
  if (round == 1) {
    previousRoundMyProcess = globalProcess2
  }
  if (round == 2) {
    previousRoundMyProcess = globalProcess3
  }
  if (round == 3) {
    previousRoundMyProcess = globalProcess4
  }
  if (round == 4) {
    previousRoundMyProcess = globalProcess5
  }
  return previousRoundMyProcess
}
