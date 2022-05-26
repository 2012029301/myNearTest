import * as d3 from 'd3'

const locale = d3.timeFormatLocale({
  dateTime: '%Y %m %d %H %M %S',
  date: '%Y %m %d',
  time: '%H %M %S',
  periods: ['上午', '下午'],
  days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  shortDays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  shortMonths: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
})

const formatTime = locale.format('%H:%M:%S')
const formatDateTime = locale.format('%m/%d %H:%M:%S')

export const dateFormat = (isSingleDay: boolean) => (date) => {
  if (!date) {
    return ''
  }
  if (isSingleDay) {
    return formatTime(date)
  }
  return formatDateTime(date)
}

const colorArray = [
  '#fff', '#3dd598', '#ffb076', '#fc5a5a', '#a461d8', '#50b5ff', '#ff9ad5', '#ffc542', '#61a0a8', '#d48265',
  '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'
]

export function getColorDefault(count: number, index: number) {
  let color
  if (index < colorArray.length) {
    color = colorArray[index]
  } else {
    color = '#000000'
  }
  return d3.color(color).rgb().toString()
}

export function checkSingleDay(xData) {
  if (xData.length < 2) {
    return false
  }
  let start = new Date(xData[0])
  let end = new Date(xData[xData.length - 1])
  if (start.getFullYear() != end.getFullYear()) {
    return false
  }
  if (start.getMonth() != end.getMonth()) {
    return false
  }
  if (start.getDate() != end.getDate()) {
    return false
  }
  return true
}

export function getMaxY(yData, hidedLineArray) {
  if (!yData) {
    return null
  }
  let maxY = 0
  for (let i = 0; i < yData.length; i++) {
    if (hidedLineArray.indexOf(i) != -1) {
      continue
    }
    let data = yData[i].filter(y => y != null)
    let max = Math.max(...data)
    if (max > maxY) {
      maxY = max
    }
  }
  return maxY
}

export function getMinY(yData, hidedLineArray) {
  if (!yData || yData.length == 0) {
    return null
  }
  let minY = null
  for (let i = 0; i < yData.length; i++) {
    if (hidedLineArray.indexOf(i) != -1) {
      continue
    }
    let data = yData[i].filter(y => y !== null && y !== undefined && y !== 'ph')
    if (data.length == 0) {
      continue
    }
    let min = Math.min(...data)
    if (minY == null || min < minY) {
      minY = min
    }
  }
  // if (typeof minY == 'number' && minY > 0) {
  //   minY = 0
  // }
  return minY
}

function nice(time) {
  return Math.floor(time / 1000 / 60) * 60 * 1000
}

/**
 * x轴时间类型
 */
export function getTickValues(scale, domain, range, ticks = 10) {
  let left = nice(scale.invert(range[0]))
  let right = nice(scale.invert(range[1]))
  let leftRightRange = (right - left) / 1000
  let interval = Math.ceil(leftRightRange / ticks)
  let count = Math.ceil((domain[1] - domain[0]) / 1000 / interval)

  if (interval / 86400 > 0.5) {
    interval = Math.ceil(interval / 86400) * 86400
  } else if (interval > 3600) {
    interval = Math.ceil(interval / 3600) * 3600
  } else if (interval > 1800) {
    interval = Math.ceil(interval / 1800) * 1800
  } else if (interval > 900) {
    interval = Math.ceil(interval / 900) * 900
  } else if (interval > 600) {
    interval = Math.ceil(interval / 600) * 600
  } else if (interval > 300) {
    interval = Math.ceil(interval / 300) * 300
  } else if (interval > 60) {
    interval = Math.ceil(interval / 60) * 60
  }

  let tickValues = d3.range(count).map(item => {
    return item * interval * 1000 + domain[0]
  })
  return tickValues.filter(item => {
    return item >= left && item <= right
  })
}

/**
 * x轴数字类型
 */
export function getTickValues1(scale, domain, range, ticks = 10) {
  let left = scale.invert(range[0])
  let right = scale.invert(range[1])
  let leftRightRange = (right - left)
  let interval = leftRightRange / ticks
  let count = (domain[1] - domain[0]) / interval

  let tickValues = d3.range(count).map(item => {
    return (item * interval + domain[0]).toFixed(1)
  })
  return tickValues.filter(item => {
    return item >= left && item <= right
  })
}

export function getVisibleTickValues(tickValues, scale, range, ticks = 10) {
  let left = scale.invert(range[0])
  let right = scale.invert(range[1])
  let visibleTickValues = tickValues.filter(item => {
    return item >= left && item <= right
  })
  if (visibleTickValues.length > ticks) {
    let interval = Math.ceil(visibleTickValues.length / ticks)
    return visibleTickValues.filter((item, index) => index % interval == 0)
  }
  return visibleTickValues
}

export function isEmpty(value) {
  return value === null || value === undefined
}

export function getYData(yData) {
  return yData.map(line => {
    return line.map((dot: any) => {
      if (dot && typeof dot == 'object') {
        return dot.value
      }
      if (typeof dot == 'string') {
        return Number(dot)
      }
      return dot
    })
  })
}

export function getYTicks(max, min, total) {
  if (max === null || min === null) {
    return null
  }
  let negative = 0
  if (min < 0 && max > 0) {
    if (max >= -min) {
      negative = 1
      let rate = max / -min
      let rate1 = (total - negative) / negative
      while (rate1 > rate) {
        negative++
        rate1 = (total - negative) / negative
      }
    } else {
      negative = total - 1
      let rate = -min / max
      let rate1 = negative / (total - negative)
      while (rate1 > rate) {
        negative--
        rate1 = negative / (total - negative)
      }
    }
    return getYTicksWithZero(negative, total - negative, min, max)
  }
  if (max < 0) {
    return getYTicksWithZero(total, 0, min, 0)
  }
  return getYTicksWithoutZero(total, min, max)
}

export function getYTicksWithZero(negativeCount, positiveCount, min, max) {
  let step1 = max / positiveCount
  let step2 = -min / negativeCount
  let maxStep = Math.max(step1 || 0, step2 || 0)
  let fixedStep = niceCeil(maxStep)
  let result = []
  for (let i = -negativeCount; i < 0; i++) {
    result.push(i * fixedStep)
  }
  for (let i = 0; i <= positiveCount; i++) {
    let v = i * fixedStep
    //小数精度问题修复 0.60000000001 => 0.6
    if (v != Number(v.toFixed(5))) {
      v = Number(v.toFixed(5))
    }
    result.push(v)
  }
  return result
}

export function getYTicksWithoutZero(count, min, max) {
  min = niceFloor(min)
  max = niceCeil(max)
  let step = (max - min) / count
  let maxStep = step
  let fixedStep = niceCeil(maxStep)
  let result = []

  for (let i = 0; i <= count; i++) {
    let v = min + i * fixedStep
    //小数精度问题修复 0.60000000001 => 0.6
    if (v != Number(v.toFixed(5))) {
      v = Number(v.toFixed(5))
    }
    result.push(v)
  }
  return result
}

/**
 * 0.33 => 0.35
 * 3.3 => 3.5
 * 13 => 15, 780 => 800, 9999 => 10000
 */
function niceCeil(step: number) {
  let scale = 1
  while (step >= 1000) {
    step = step / 10
    scale *= 10
  }
  while (step < 100) {
    step = step * 10
    scale /= 10
  }
  let top = Math.ceil(step)
  let middle = Math.floor(step) + 0.5
  if (middle < step) {
    step = top
  } else {
    step = middle < top ? middle : top
  }
  return step * scale
}

function niceFloor(step: number) {
  let scale = 1
  while (step >= 1000) {
    step = step / 10
    scale *= 10
  }
  while (step < 100) {
    step = step * 10
    scale /= 10
  }
  let bottom = Math.floor(step)
  let middle = Math.floor(step) + 0.5
  if (middle < step) {
    step = middle
  } else {
    step = bottom
  }
  return step * scale
}
