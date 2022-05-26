import classNames from 'classnames';
import React, { useState, useEffect, useRef } from 'react'
import classnames from 'classnames'

interface Props {
    total: number
    hereNum: number
    isCall: boolean
}
const DashBoard: React.FC<Props> = function (this: null, props) {
    let percentage = '0'
  let deg= 0;
    if (props.hereNum && props.total) {
        percentage = (((props.hereNum / props.total * 100)).toFixed(2))
      deg = (props.hereNum / props.total) * 180
    }
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    let toNum = (props.hereNum / props.total) * list.length
    return (
        <div className='common-dash-board'>
            <section className='dash-board-part1 vh-center relative mb-20'>
                <div className='out-cicle relative'>
                    <div className='inner-cicle'></div>
                    {
                        list.map((item) => {
                            return <div key={item} className={classNames(`block${item} block`, { 'call-active': props.isCall && toNum >= item, 'put-active': !props.isCall && toNum >= item })}></div>
                        })
                    }
                    {
                        props.isCall &&
                        <img className='pointer' style={{ transform: `rotate(${deg}deg)` }} src={require('../../assets/images/callpointer.png')} alt="" />
                    }
                    {
                        !props.isCall &&
                        <img className='pointer' style={{ transform: `rotate(${deg}deg)` }} src={require('../../assets/images/putpointer.png')} alt="" />
                    }
                </div>

            </section>
            <section className={classnames('dash-board-part2  vh-center',{ 'part2-call':props.isCall,'part2-put':!props.isCall})}>
                <i>{percentage} %</i>
            </section>
        </div>
    )
}

export default DashBoard
