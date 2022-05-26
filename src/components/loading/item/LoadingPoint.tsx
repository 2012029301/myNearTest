import classNames from 'classnames'
import React, {useEffect, useState} from 'react'

interface Props {
  isSuccess?: boolean
}

const LoadingPoint: React.FC<Props> = function (this: null, props) {
  const list = [1, 2, 3]
  const [pointNum, setPointNum] = useState(0)
  const [percentage, setPercentage] = useState(0)
  useEffect(() => {
    let time = setTimeout(() => {
      if (pointNum == 2) {
        setPointNum(0)
      } else {
        setPointNum(pointNum + 1)
      }
      if (percentage < 98) {
        setPercentage(percentage + 1)
      }
    }, 500)
    return () => {
      clearTimeout(time)
    }
  }, [pointNum])


  return (
    <div className="loading-point-wrap">
      <span style={{fontSize: '18px'}}>Loading</span>

      {
        list.map((item, index) => {
          return <div key={index} className={classNames('point-list ml-10', {'active': pointNum == index})}></div>
        })
      }
      <span className="ml-10">
                {
                  !props.isSuccess && percentage
                }
        {
          props.isSuccess && '100'
        }
        %

            </span>

    </div>
  )
}

export default LoadingPoint
