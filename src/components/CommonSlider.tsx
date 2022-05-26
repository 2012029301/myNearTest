import {Slider} from 'antd'
import classNames from 'classnames'
import React, {useState} from 'react'
import {rounding} from '../utils/commonUtil'

const formatter = (value) => {
  return `${value}%`
}

interface Props {
  isCanPlay: boolean
  roundChip: number
  setCallCount: (v) => void
  callCount: number
}

const CommonSlider: React.FC<Props> = function (this: null, props) {
  let putCount = props.roundChip - props.callCount

  return (
    <div className={classNames('common-slider-wrap')}>
      <section className="part1">
        <div className="left">
          <div className="relative call-box">
            <img src={require('../assets/images/call-pu-box-bg.png')} alt=""/>
            {
              props.isCanPlay && <i className="num vh-center">{props.callCount || 0}</i>
            }
            {
              !props.isCanPlay && <i className="num vh-center" style={{color: '#898989'}}>--</i>
            }
          </div>
          <i className={classNames('vh-center ml-10 call-text', {'gray': !props.isCanPlay})}>Call</i>
        </div>
        <div className="right">
          <i className={classNames('vh-center  put-text', {'gray': !props.isCanPlay})}>Put</i>
          <div className="relative ml-10 put-box">
            <img src={require('../assets/images/call-pu-box-bg.png')} alt=""/>
            {
              props.isCanPlay && <i className="num vh-center ">
                {(props.roundChip - props.callCount) || 0}
              </i>
            }
            {
              !props.isCanPlay && <i className="num vh-center " style={{color: '#898989'}}>--</i>
            }
          </div>
        </div>
      </section>
      <div className="part2-wrap">
        <section className={classNames('part2 ', {'can-play': props.isCanPlay, 'no-can-play': !props.isCanPlay})}>
          <div className="semicircle1"></div>
          <Slider
            disabled={!props.isCanPlay}
            tooltipVisible={false}
            tipFormatter={formatter}
            value={putCount / props.roundChip * 100}
            onChange={(v) => {
              props.setCallCount(props.roundChip - rounding(props.roundChip * v / 100))
            }}
          />
          <div className="semicircle2"></div>
        </section>
      </div>
    </div>
  )
}

export default CommonSlider
