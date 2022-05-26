import React, {useEffect, useRef, useState} from 'react'
import _ from 'lodash'

import FullLoading from '../FullLoading'
import {margin} from './core/chartConstants'
import {checkSingleDay, getColorDefault, getYData} from './chartUtil'
import {LineChartCommon} from './chart/LineChartCommon'
import ToolTip from './ToolTip'
import Series from './Series'
import {GetColor, getUniqueId, XData} from '.'
import {useConfig} from '../context/ConfigContext'

interface Props {
  loading?: boolean
  xData?: XData
  yData?: number[][]
  series?: { name: string, unit: string }[]
  component?: any
  options?: {
    min?: number
    startValue?: number
    currentValue?: number
    margin?: any
    showSeries?: boolean
    tickWidth?: number
    tickValues?: number[]
    tooltipDateFormat?: string | ((item) => string)
    dateFormat?: any
    getColor?: GetColor
    opacity?: string[]
    startDate?: number
    endDate?: number
    backOpacity?: number[]
    axisColor?: string
    axisTextColor?: string
    zeroXAxis?: boolean
    fireEndTime?: number
    roundEndTime?: number
  }
}

const LineChart: React.FC<Props> = function (this: null, props) {
  const svgRef: React.RefObject<SVGSVGElement> = React.createRef()
  const rootRef: React.RefObject<HTMLDivElement> = React.createRef()
  const chart = useRef<LineChartCommon>()
  const chartUniqueId = useRef(`LineChart-${getUniqueId()}`)

  const [xIndex, setXIndex] = useState(-1)
  const [x, setX] = useState(-1000)
  const [y, setY] = useState(-1000)

  const config = useConfig()

  const resize = () => {
    chart.current.resize()
  }

  const mouseMove = (e) => {
    doMouseMove()
  }

  const doMouseMove = _.throttle(() => {
    if (svgRef.current && xIndex > -1) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const x = svgRect.left + getLeft()
      const y = svgRect.top + 60
      setX(x)
      setY(y)
    }
  }, 100, {trailing: true})

  const getLeft = () => {
    let {xDataScale, width} = chart.current
    let left = xDataScale[xIndex] || -1
    if (left < width - 180) {
      return left + getOptions().margin.left + 10
    } else {
      return left + getOptions().margin.left - 190
    }
  }
  const getOptions = () => {
    const theme = config.theme
    let {getColor} = props.options
    if (!getColor) {
      getColor = getColorDefault
    }
    return {
      ...theme,
      ...props.options,
      getColor,
      chartUniqueId: chartUniqueId.current,
      margin: {...margin, ...(props.options.margin || {})}
    }
  }

  const getXData = () => {
    if (Array.isArray(props.xData[0])) {
      return props.xData
    }
    return props.yData.map(() => props.xData)
  }

  useEffect(() => {
    let Ctor = props.component || LineChartCommon
    chart.current = new Ctor(rootRef.current, svgRef.current, getXData(), props.yData, props.series, getOptions())
    chart.current.init()
    chart.current.on('xIndexChange', ({xIndex}) => {
      setXIndex(xIndex)
    })
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      if (chart.current) {
        chart.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    chart.current.refresh(getXData(), props.yData, props.series, getOptions())
  }, [JSON.stringify(props.xData), JSON.stringify(props.yData), JSON.stringify(props.options), JSON.stringify(config.theme)])

  let seriesNames = props.series?.filter(item => item.name != '' && item.name != undefined)
  return (
    <div
      ref={rootRef}
      style={{position: 'relative', height: '100%', width: '100%', paddingTop: seriesNames.length > 0 && getOptions().showSeries ? 20 : 0}}
      className="chart"
      onMouseMove={mouseMove}
      onMouseLeave={() => setXIndex(-1)}
      onScroll={() => setXIndex(-1)}
    >
      {
        props.loading && (<FullLoading/>)
      }
      {
        xIndex != -1 && (
          <ToolTip
            dateFormat={props.options.tooltipDateFormat || (checkSingleDay(props.xData) ? 'HH:mm:ss' : undefined)}
            xData={getXData()}
            yData={getYData(props.yData)}
            series={props.series}
            xIndex={xIndex}
            lineIndex={0}
            hidedLineArray={[]}
            left={x}
            top={y}
            getColor={getOptions().getColor}
            noDataStr={'No data'}
          />
        )
      }
      {
        (props.options.showSeries !== false && seriesNames.length > 0) && (
          <Series
            type="line"
            series={props.series}
            hidedLineArray={[]}
            toggle={() => null}
            getColor={getOptions().getColor}
          />
        )
      }
      {props.children}
      <svg ref={svgRef} width="100%" height="100%">
        <defs>
          {
            props.yData.map((item, index) => {
              const getColorFn = getOptions().getColor
              let color = getColorFn(props.yData.length, index)

              return (
                <linearGradient key={index} id={`${chartUniqueId.current}-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor={color} stopOpacity={getOptions()?.backOpacity?.[0] ?? '0.1'}></stop>
                  <stop offset="1" stopColor={color} stopOpacity={getOptions()?.backOpacity?.[1] ?? '0.05'}></stop>
                </linearGradient>
              )
            })
          }
          <linearGradient id={`${chartUniqueId.current}-up`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={'#41D587'} stopOpacity={'0.2'}></stop>
            <stop offset="1" stopColor={'#41D587'} stopOpacity={'0.1'}></stop>
          </linearGradient>
          <linearGradient id={`${chartUniqueId.current}-down`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={'#FA4204'} stopOpacity={'0.2'}></stop>
            <stop offset="1" stopColor={'#FA4204'} stopOpacity={'0.1'}></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

LineChart.defaultProps = {
  loading: false,
  xData: [],
  yData: [],
  series: [],
  options: {
    backOpacity: []
  }
}

// static defaultProps = {
//   xData: ['2019-10-10 01:20:00', '2019-10-13 03:20:00', '2019-10-25 05:20:00'],
//   yData: [[1, 5, 3], [2, 6, 9]],
//   series: [{name: 'kk'}, {name: 'oo'}]
// }

export default LineChart
