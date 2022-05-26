import {EventEmitter} from 'events'
import * as d3 from 'd3'
import {ScaleLinear} from 'd3-scale'
import _ from 'lodash'
import {Selection} from 'd3-selection'
import {
  getMinY,
  getMaxY,
  getYTicks,
  checkSingleDay,
  dateFormat,
  getVisibleTickValues,
  getTickValues,
  getTickValues1
} from '../chartUtil'
import XAxisShapeMulti from '../shapes/multi/XAxisShapeMulti'
import YAxisShape from '../shapes/YAxisShape'

export interface IShape {
  draw?: (...args) => void
  scale?: (xz, tickValues?, context?) => void
  refresh?: (...args) => void
  reset?: (...args) => void
  destroy?: (...args) => void
}

let uid = 1
let circleUid = 1

export class BaseChart extends EventEmitter {
  rootDom: HTMLDivElement
  svgDom: SVGSVGElement
  clipId: string = `clipId-${uid++}` // 防止折现超出y轴范围
  circleClipId: string = `circleClipId-${circleUid++}`
  totalWidth: number
  totalHeight: number
  width: number     // 不包括y轴左边宽度
  height: number    // 不包括x轴下面高度，scrollScaleArea高度（参考showScrollScaleArea这个外部option）
  oldXData: any[][] // 未处理过的，外部传入的xData
  xData: any[][]    // 处理过的，已经将字符串时间转化为数字格式
  yData: number[][]
  series: { name: string, unit: string, stack?: string }[]
  domain//x轴对应时间区间
  range// x轴对应宽度区间
  options: Record<string, any>


  //d3
  svg: Selection<SVGSVGElement, any, any, any>
  gOut: Selection<SVGGElement, any, any, any>// x轴、y轴都在这个容器内
  scaleX: ScaleLinear<number, number>// x轴比例尺
  scaleY: ScaleLinear<number, number>// y轴比例尺

  leaveOutFlag = false// 处理鼠标移出后，tooltip没有消失问题
  beforeLineIndex = -1
  hidedLineArray = []// 当前没有显示的曲线下标，点击图例可以关闭对应曲线
  xIndex = -1// 当前鼠标离那个点最近
  beforeXIndex = -1// 判断是否和xIndex相等，相等就不需要再处理

  constructor(rootDom, svgDom, xData, yData, series, options) {
    super()
    this.options = options
    this.handleOption()
    this.totalWidth = svgDom.clientWidth
    this.totalHeight = svgDom.clientHeight
    this.svgDom = svgDom
    this.oldXData = xData
    this.xData = xData
    this.yData = yData
    this.series = series || []
    this.rootDom = rootDom
    this.svg = d3.select(svgDom)
    this.svg.attr('viewBox', `0 0 ${this.totalWidth} ${this.totalHeight}`)
  }

  init() {
    let margin = this.getOption().margin
    this.width = this.totalWidth - margin.left - margin.right
    this.height = this.getChartHeight()
    this.xData = this.getXData()

    this.gOut = this.svg.append('g')
    this.gOut.attr('transform', `translate(${margin.left}, ${margin.top})`)
    this.gOut.append('rect').attr('x', 0).attr('y', 0).attr('width', this.width).attr('height', this.height).attr('fill', 'transparent')
    this.gOut.append('clipPath').attr('id', this.clipId).append('rect').attr('width', this.width).attr('height', this.height)
    this.gOut.append('clipPath')
      .attr('id', this.circleClipId)
      .attr('transform', `translate(-3, -3)`)
      .append('rect')
      .attr('width', this.width + 6)
      .attr('height', this.height + 6)
    this.initDomain()
    this.initRange()
    this.createScaleX()
    this.createScaleY()
    this.initEvent()
    this.buildShapes()
    this.render()
  }

  // 外部有新的数据
  refresh(xData, yData, series, options) {
    this.oldXData = xData
    this.options = options
    this.handleOption()
    this.refreshData(xData, yData, series)
    this.buildShapes()
    this.render()
  }

  // 浏览器触发了resize事件，重新计算宽高
  resize() {
    let margin = this.getOption().margin
    this.totalWidth = this.svgDom.clientWidth
    this.totalHeight = this.svgDom.clientHeight
    this.width = this.totalWidth - margin.left - margin.right
    this.height = this.getChartHeight()
    this.svg.attr('viewBox', `0 0 ${this.width + margin.left + margin.right} ${this.height + margin.top + margin.bottom}`)
    this.gOut.select('clipPath rect').attr('width', this.width).attr('height', this.height)
    this.gOut.select(`clipPath#${this.circleClipId} rect`)
      .attr('width', this.width + 6)
      .attr('height', this.height + 6)
    this.refreshData(this.oldXData, this.yData, this.series)
    this.buildShapes()
    this.render()
  }

  render() {
    this.renderPoint()
    this.renderXAxis()
    this.renderYAxis()
  }

  // 点击图例隐藏部分折线数据
  toggle(hidedLineArray) {
    this.hidedLineArray = hidedLineArray
    this.refreshData(this.oldXData, this.yData, this.series)
    this.buildShapes()
    this.render()
  }

  refreshData(xData, yData, series) {
    this.destroy()
    this.xData = this.getXData()
    this.yData = yData
    this.series = series || []
    this.initDomain()
    this.initRange()
    this.createScaleX()
    this.createScaleY()
  }

  // 绑定鼠标事件
  initEvent() {
    let handleMouseMove = _.debounce(this.handleMouseMove.bind(this), 5)
    this.gOut.on('mousemove', () => {
      this.leaveOutFlag = false
      //@ts-ignore
      let mouseInfo = d3.mouse(this.svg.node())
      handleMouseMove(mouseInfo)
    }).on('mouseleave', () => {
      this.leaveOutFlag = true
      this.handleMouseLeave()
      this.emit('xIndexChange', {lineIndex: -1, xIndex: -1})
      this.xIndex = -1
      this.beforeXIndex = -1
    })
  }

  // x轴时间范围
  initDomain() {
    let options = this.getOption()
    let minY = getMinY(this.yData, this.hidedLineArray)
    if (options.startDate && options.endDate) {
      this.domain = [options.startDate, options.endDate]
    } else {
      this.domain = minY == null ? [] : [this.getMinX(), this.getMaxX()]
    }
  }

  // x轴宽度范围
  initRange() {
    this.range = [this.getLeft(), this.width]
  }

  // 创建线性比例尺
  createScaleX() {
    this.scaleX = d3.scaleLinear().domain(this.domain).range(this.range)
  }

  createScaleY() {
    let ticks = this.getYTickValues()
    this.scaleY = d3
      .scaleLinear()
      .domain(ticks === null ? [] : [ticks[0], ticks[ticks.length - 1]])
      .range([this.height, 0])
  }

  // 生成x轴，y轴，折现，柱状图，不同子类会实现此方法
  buildShapes() {
    throw new Error('override in subclass')
  }

  isDateTime(option) {
    if (option.startDate || option.endDate) {
      return true
    }
    //类型+长度判断
    let firstData = this.oldXData?.[0]?.[0]
    if ((firstData + '').length === 13) {
      return true
    }
    return typeof firstData == 'string' && (firstData.length == 19 || firstData.length == 24)
  }

  isShowScrollScaleArea() {
    return this.options.showScrollScaleArea
  }

  handleOption() {
  }

  getOption(): Record<string, any> {
    return this.options
  }

  // 获取x轴时间展示回调函数
  getDateFormat() {
    if (this.options.dateFormat) {
      return this.options.dateFormat
    }
    if (this.isDateTime(this.options)) {
      const isSingleDay = checkSingleDay(this.xData[0])
      return dateFormat(isSingleDay)
    } else {
      return d => d
    }
  }

  // x轴有多少个刻度
  getTicks(): number {
    return Math.floor(this.width / (this.options.tickWidth ?? this.getTickWidth()))
  }

  // x轴时间所占的宽度
  getTickWidth(): number {
    if (this.xData && this.isDateTime(this.options)) {
      const isSingleDay = checkSingleDay(this.xData[0])
      return (isSingleDay ? 120 : 200)
    }
    return 150
  }

  /**
   * x、y轴交叉点离左边距离，排除margin.left，多y轴处理逻辑
   */
  getLeft() {
    return 0
  }

  // 不包括margin，底部ScrollScale部分
  getChartHeight() {
    let margin = this.getOption().margin
    return this.totalHeight - margin.top - margin.bottom
  }

  getScrollScaleHeight() {
    return 10
  }

  // xData最小值
  getMinX() {
    let min = null
    this.xData.forEach(item => {
      if ((item[0] && item[0] < min) || min === null) {
        min = item[0]
      }
    })
    return min
  }

  // xData最大值
  getMaxX() {
    let max = null
    this.xData.forEach(item => {
      if ((item[item.length - 1] && item[item.length - 1] > max) || max === null) {
        max = item[item.length - 1]
      }
    })
    return max
  }

  // yData最小值，大于0时，取0
  getMinY() {
    let minY = getMinY(this.yData, this.hidedLineArray)
    let initYRange = this.getOption().initYRange
    if (initYRange) {
      minY = Math.min(initYRange[0], minY)
    }
    return minY
  }

  // yData最大值，小于0时，取0
  getMaxY() {
    let maxY = getMaxY(this.yData, this.hidedLineArray)
    let initYRange = this.getOption().initYRange
    if (initYRange) {
      maxY = Math.max(initYRange[1], maxY)
    }
    return maxY
  }

  // y轴显示多少个数字
  getYTickLength() {
    return 9
  }

  // 寻找x轴在y轴的位置，一般是0
  getBase(min, max) {
    if (min == max) {
      max++
    }
    if (min > 0) {
      return min
    }
    if (max < 0) {
      return max
    }
    return 0
  }

  // 根据yData最小值、最大值，计算y轴所有显示的数字
  getYTickValues() {
    let min = this.getMinY()
    let max = this.getMaxY()
    if (min == max) {
      max++
    }
    //保持startValue 处于min、max中间位置
    let startValue = this.options.startValue
    if (startValue) {
      if (min > startValue) {
        min = startValue
      }
      if (max < startValue) {
        max = startValue
      }
      let d1 = max - startValue
      let d2 = startValue - min
      if (d2 == 0) {
        min -= d1
      } else {
        if (d1 > d2) {
          min = startValue - d1
        }
        if (d1 < d2) {
          max = startValue + d2
        }
      }
    }
    let result = getYTicks(max, min, this.getYTickLength())
    if (result) {
      return result.map(item => item.toFixed(4))
    }
    return result
  }

  getSubLines() {
    return this.getYTickValues()
  }

  getXAxisShape(): IShape {
    throw new Error('override')
  }

  getYAxisShape(): IShape {
    throw new Error('override')
  }

  // 鼠标移动事件，做了节流处理，展示tooltip当前点的数据
  handleMouseMove(mouseInfo) {
    if (this.leaveOutFlag) { // 因为做了debounce处理，执行在mouseLeave后面执行，需要再次判断鼠标是否移出图表
      return
    }
    if (this.getXDataLength() == 0) {
      return
    }
    let margin = this.getOption().margin
    let handleMouseX = this.getOption().handleMouseX
    let mouseX = (handleMouseX ? handleMouseX(mouseInfo[0]) : mouseInfo[0]) - margin.left

    let info = this.getNearestInfo(mouseX)
    this.handleTooltip(info)
  }

  handleTooltip(info) {

  }

  handleMouseLeave() {

  }

  // 根据鼠标坐标，获取最近有数据的位置
  getNearestInfo(mouseX): { lineIndex, xIndex, x } {
    throw new Error('')
  }

  // 将xData转换为数字，如果是时间字符串
  getXData() {
    if (this.isDateTime(this.options)) {
      return (this.oldXData as string[][]).map(sub => {
        return sub.map(item => +new Date(item))
      })
    }
    return this.oldXData
  }

  // xData可以是一维数组，也可以是2维，2维时，说明每条曲线有对应的时间轴数据
  getXDataLength() {
    if (Array.isArray(this.xData[0])) {
      let set = new Set()
      this.xData.forEach(sub => {
        sub.forEach(item => {
          set.add(item)
        })
      })
      return set.size
    }
    return this.xData.length
  }

  // 根据当前的缩放比例，计算x轴要展示的数据
  calcTickValues(scaleX) {
    let {tickValues, ticks} = this.options
    if (tickValues) {
      // 如果option已经传了所有的x轴数据，过滤出可见的
      return getVisibleTickValues(tickValues, scaleX, this.range, ticks)
    }
    if (this.isDateTime(this.options)) {
      return getTickValues(scaleX, this.domain, this.range, this.getTicks())
    }
    return getTickValues1(scaleX, this.domain, this.range, this.getTicks())
  }

  // 构建x轴，包括辅助线
  buildXAxisShape(): IShape {
    let yTickValues = this.getYTickValues() || [0, 0]
    let {axisColor, subAxisColor, axisTextColor, axisFontSize} = this.getOption()
    return new XAxisShapeMulti(
      this.gOut,
      this.scaleX,
      this.scaleY,
      {
        tickValues: this.calcTickValues(this.scaleX),
        base: this.getBase(yTickValues[0], yTickValues[yTickValues.length - 1]),
        yTickValues,
        subLines: this.getSubLines(),
        dateFormat: this.getDateFormat(),
        axisColor,
        axisTextColor,
        axisFontSize,
        subAxisColor,
        width: this.width,
        left: this.getLeft(),
        height: this.height
      })
  }

  buildYAxisShape() {
    let yTickValues = this.getYTickValues()
    // console.log('yTickValues', yTickValues)
    const {axisColor, axisTextColor, axisFontSize} = this.options
    return new YAxisShape(this.gOut, this.scaleY,
      {
        unit: this.series[0]?.unit,
        left: this.getLeft(),
        tickValues: yTickValues,
        tickFormat: (d: number) => {
          let maxY = getMaxY(this.yData, this.hidedLineArray)
          if (maxY == null) {
            return ''
          }
          return d.toString()
        },
        direction: 'left',
        axisColor, axisTextColor, axisFontSize
      })
  }

  buildTip() {

  }

  refreshXAxis() {

  }

  renderXAxis() {
    this.getXAxisShape().draw()
  }

  renderYAxis() {
    this.getYAxisShape().draw()
  }

  renderPoint() {
  }

  // 销毁
  destroy() {
    this.getXAxisShape().destroy()
    this.getYAxisShape().destroy()
  }
}
