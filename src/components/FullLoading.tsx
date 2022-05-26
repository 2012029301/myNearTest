import React, { CSSProperties } from 'react'
import { Spin } from 'antd'

export default class FullLoading extends React.Component<{ tip?: string, style?: CSSProperties }, {}> {
  render() {
    let style = this.props.style || {}
    const tip = 'loading...'

    return (
      <div
        className="vh-center full-loading"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 99,
          background: 'transparent',
          ...style
        }}
      >
        <Spin tip={tip} />
      </div>
    )
  }
}
