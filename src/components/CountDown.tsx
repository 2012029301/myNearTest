import React, { useEffect, useState } from 'react'

interface Props {
    seconds: number
    style?: object
}

const CountDown: React.FC<Props> = function (this: null, props) {
    let { style = {} } = props
    const [value, setValue] = useState(0)

    useEffect(() => {
        setValue(props.seconds > 0 ? props.seconds : 0)
    }, [props.seconds])

    useEffect(() => {
        let taskId = setInterval(() => {
            if (value > 0) {
                setValue(value - 1)
            }
        }, 1000)
        return () => {
            clearInterval(taskId)
        }
    }, [value])

    let days = Math.floor(value / (60 * 60 * 24))
    let hours = (Math.floor(value % (60 * 60 * 24) / (60 * 60))).toString().padStart(2, '0')

    let minute = (Math.floor(value % (60 * 60) / 60)).toString().padStart(2, '0')

    if (days == 0) {
        return (
            <span style={{...style,fontStyle: 'italic' }}>
                {hours}:{minute}:{(value % 60).toString().padStart(2, '0')}
            </span>
        )
    }
    return (
        <span style={{...style,fontStyle: 'italic' }}>
            {days} Day {hours}:{minute}:{(value % 60).toString().padStart(2, '0')}
        </span>
    )
}

export default CountDown
