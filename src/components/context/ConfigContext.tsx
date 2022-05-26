import React, { useContext } from 'react'

const ConfigContext = React.createContext({theme: {}})
export const useConfig = () => {
  const config = useContext(ConfigContext)
  return config
}

export default ConfigContext
