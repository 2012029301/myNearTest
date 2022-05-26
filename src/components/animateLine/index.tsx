import React, { useState, useEffect, useRef } from 'react'
import './index.less'
interface Props {
    show
}
const AnimateLine: React.FC<Props> = function (props) {
    const {show} = props
    return(
        <>
            {
                (show!==0&&show==null)&&<span className="animate-line" ></span>
            }
        </>
    )
}

export default AnimateLine
