import React, { useEffect, useState } from 'react'
import LoadingPoint from './item/LoadingPoint'
import classNames from 'classnames'

interface Props {
    isSuccess?: boolean
  isAttract?:boolean
  text?:string
}

const KakiLoading: React.FC<Props> = function (this: null, props) {
    const [outSuccessTime, setOutSuccessTime] = useState(false)

    useEffect(() => {
        if (props.isSuccess) {
            let time = setTimeout(() => {
                setOutSuccessTime(!outSuccessTime)

            }, 1000)
            return () => {
                clearTimeout(time)
            }
        }
    }, [props.isSuccess])

    return (
        <div className={classNames('kaki-loading',{'kaki-attract-loading':props.isAttract})}>
            {
                // props.isSuccess &&
                // <img style={{ width: '50px' }} src={require('../../container/img/kakiloadingsuccess.gif')} alt="" />

            }
            {
                !props.isSuccess &&!props.isAttract&&
                <img style={{ width: '50px' }} src={require('../../assets/images/kakiloading.gif')} alt="" />
            }
          {
            props.isAttract&&
            <img style={{ width: '50px' }} src={require('../../assets/attract/squid/loading-icon.png')} alt="" />


          }
            {
                props.isSuccess && outSuccessTime && <span style={{ fontSize: '18px' }} > Success</span>
            }
            {
                (!props.isSuccess || !outSuccessTime) && <LoadingPoint isSuccess={props.isSuccess} />
            }
        </div >
    )
}

export default KakiLoading
