import {useEffect, useRef, useState} from 'react'

export default function useBeforeValue(value) {
  const current = useRef(null)
  const [previous, setPrevious] = useState(null)

  useEffect(() => {
    if (current.current !== null) {
      setPrevious(current.current)
    }
    if (value !== null) {
      current.current = value
    }
  }, [value])

  return previous
}
