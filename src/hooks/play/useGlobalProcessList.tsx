import getReduxState from '@/hooks/common/getReduxState'

export default function useGlobalProcessList() {
  const globalProcess1 = getReduxState(state => state.app.globalProcess1)
  const globalProcess2 = getReduxState(state => state.app.globalProcess2)
  const globalProcess3 = getReduxState(state => state.app.globalProcess3)
  const globalProcess4 = getReduxState(state => state.app.globalProcess4)
  const globalProcess5 = getReduxState(state => state.app.globalProcess5)


  return [globalProcess1, globalProcess2, globalProcess3, globalProcess4, globalProcess5]
}
