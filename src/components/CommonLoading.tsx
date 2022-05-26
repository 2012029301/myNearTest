import React, {useState, useEffect, useRef} from 'react'
import classNames from 'classnames'

interface Props {
isTransparent?:boolean
  isAttract?:boolean
}

const CommonLoading: React.FC<Props> = function (this: null, props) {
  const list = [1, 2, 3]
  const [pointNum, setPointNum] = useState(0)
  useEffect(() => {
    let time = setTimeout(() => {
      if (pointNum == 2) {
        setPointNum(0)
      } else {
        setPointNum(pointNum + 1)
      }

    }, 500)
    return () => {
      clearTimeout(time)
    }
  }, [pointNum])

  return (
    <div className={classNames('common-squid-loading',{'transparent': props.isTransparent,'attract-loading':props.isAttract})}>
      {
       props.isAttract&&
       <img style={{width:'60px',height:'60px'}} className={'mb-10'} src={require('../assets/attract/header-left.png')} alt=""/>
      }
      {
        !props.isAttract&&
        <img className={'mb-10'} src={require('../assets/images/loading.gif')} alt=""/>
      }

      <div  className="d-flex vh-center " style={{fontSize: '16px',color:props.isAttract?'#156C89':'wheat'}}>
        {
          props.isAttract&&
            'Loading'
        }
        {
          list.map((item, index) => {
            return <div key={index} style={{background:props.isAttract?'#156C89':'wheat'}} className={classNames('point-list ml-10', {'active': pointNum == index})} ></div>
          })
        }
      </div>


    </div>
  )
}

export default CommonLoading
