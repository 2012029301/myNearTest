import React, {useImperativeHandle, useLayoutEffect, useRef} from 'react'
import ReactDom from 'react-dom'
import moment from 'moment'
import {GetColor} from '.'
import {isEmpty} from './chartUtil'

export interface ToolTipRef {
  container: HTMLDivElement
}

interface Props {
  dateFormat?: string | ((item) => string)
  left: number
  top: number
  lineIndex: number
  xIndex: number
  hidedLineArray: number[]
  xData: any[]
  yData: any[][]
  series: any[]
  getColor?: GetColor
  noDataStr: string
  formatValue?: (d: number) => any
}

const ToolTip = React.forwardRef<ToolTipRef, Props>((props, _ref) => {
  const ref = useRef<HTMLDivElement>()
  const getColorFn = props.getColor

  useImperativeHandle(_ref, () => ({
    container: ref.current
  }))

  const getLineInfo = (lineIndex) => {
    let matchIndex = props.xData[lineIndex].findIndex(item => item == current)
    let value = matchIndex != -1 ? props.yData[lineIndex][matchIndex] : null
    let content = !isEmpty(value) ? (props.formatValue ? props.formatValue(value) : value) : props.noDataStr
    if (!isEmpty(value)) {
      content += (props.series[lineIndex].unit || '')
    }
    return (
      <>
        <span className={'wanke-chart-line-text-title'}>{props.series[lineIndex].name}：</span>
        <span className={'wanke-chart-line-text-value'}>{content}</span>
      </>
    )
  }

  useLayoutEffect(() => {
    let {clientWidth, clientHeight} = ref.current
    if (props.top + clientHeight > document.body.clientHeight) {
      let nextTop = props.top - clientHeight
      if (nextTop < 0) nextTop = 10
      ref.current.style.top = nextTop + 'px'
    }
    if (props.left + clientWidth > document.body.clientWidth) {
      ref.current.style.left = props.left - clientWidth + 'px'
    }
  }, [props.top, props.left])

  let current = props.xData[props.lineIndex][props.xIndex]

  let child = (
    <div ref={ref} className={'chart-point-info-box'} style={{left: props.left, top: props.top}}>
      <div className={'chart-point-date'}>
        {
          typeof props.dateFormat == 'string' && moment(props.xData[props.lineIndex][props.xIndex]).format(props.dateFormat)
        }
        {
          typeof props.dateFormat == 'function' && props.dateFormat(props.xData[props.lineIndex][props.xIndex])
        }
      </div>
      {
        props.yData.map((item, lineIndex) => {
          if (props.hidedLineArray.indexOf(lineIndex) != -1) {
            return null
          }
          return (
            <div key={lineIndex} className={'chart-box-line'}>
              <div className={'chart-line-color-circle'}
                   style={{background: getColorFn(props.yData.length, lineIndex)}}>
              </div>
              <div className={'chart-line-text'}>
                {getLineInfo(lineIndex)}
              </div>
            </div>
          )
        })
      }
    </div>
  )

  return ReactDom.createPortal(child, document.body)
})

ToolTip.defaultProps = {
  dateFormat: 'YYYY-MM-DD HH:mm:ss'
}

export default ToolTip
