import {useState} from 'react'

export default function usePosition(dom) {
  const [obj] = useState({x: null, y: null})
  if (dom) {
    let p = dom.getBoundingClientRect()
    obj.x = p.left + p.width / 2
    obj.y = p.top + p.height / 2
  }
  return obj
}
