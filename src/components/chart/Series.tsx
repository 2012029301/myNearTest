import React from 'react'
import classnames from 'classnames'
import { GetColor } from '.'

interface Props {
  type: 'line' | 'bar' | ((index) => string)
  series: any[]
  hidedLineArray: number[]
  toggle: (index) => void
  getColor?: GetColor
}

const Series: React.FC<Props> = function(this: null, props) {
  const getColorFn = props.getColor

  const unitList = [];
  props.series.forEach(item => {
    if(unitList.indexOf(item.unit) === -1) {
      unitList.push(item.unit)
    }
  })

  return (
    <div className={classnames('chart-labels', {'chart-center': unitList.length > 1})}>
      <div className={'chart-label-wrapper'}>
        {
          props.series.map((item, index) => {
            let type
            if (typeof props.type == 'function') {
              type = props.type(index)
            } else {
              type = props.type
            }
            let isHide = props.hidedLineArray.indexOf(index) != -1
            const color = getColorFn(props.series.length, index)
            return (
              <div key={index}
                   className={classnames('chart-label', {'chart-hide': isHide})}
                   onClick={() => props.toggle(index)}>
                {
                  type == 'line' && (
                    <div
                      className={'chart-line-series-shape'}
                      style={{background: isHide ? '#aaa' : getColorFn(props.series.length, index)}}>
                      <div className={'chart-circle'} style={{borderColor: isHide ? '#aaa' : getColorFn(props.series.length, index)}}></div>
                    </div>
                  )
                }
                {
                  type == 'bar' && (
                    <div
                      className={'chart-bar-series-shape'}
                      style={{background: isHide ? '#aaa' : getColorFn(props.series.length, index)}}>
                    </div>
                  )
                }

                {item.name}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Series
