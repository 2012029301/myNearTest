import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

interface Props {
  fontSize?: number
}

const Loading: React.FC<Props> = function (this: null, props) {
  const antIcon = <LoadingOutlined style={{ fontSize: props.fontSize || 24 }} spin />
  return (
    <div>
      {/*<img src={require('../assets/images/loading.svg')} alt=""/>*/}
      Loading
      <Spin indicator={ <img className={'common-animate-loading'} src={require('../assets/images/loading.svg')} alt=""/>} />
    </div>

  )
}

export default Loading
