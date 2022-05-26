import * as d3 from 'd3'
import {BaseChart, IShape} from './BaseChart'
import ScrollScaleShape from '../shapes/ScrollScaleShape'

export class BaseScaleChart extends BaseChart {
  scrollScaleContainer
  xDataScale: number[][]
  zoom: any
  transform: any = d3.zoomIdentity
  scrollScaleShape: IShape

  createZoom() {
    let chartWidth = this.width - this.getLeft()
    let chartHeight = this.height
    this.zoom = d3.zoom()
      .extent([[0, 0], [chartWidth, chartHeight]])
      .scaleExtent([1, 1])
      .translateExtent([[0, 0], [chartWidth, chartHeight]])
      .on('zoom', () => this.zoomed())
    this.gOut.call(this.zoom)
  }

  init() {
    super.init()
    this.xDataScale = this.xData.map(sub => sub.map(this.scaleX))
    this.createZoom()
    this.afterRender()
  }

  buildShapes() {
    if (this.isShowScrollScaleArea()) {
      const {margin} = this.getOption()
      this.scrollScaleContainer = this.svg.append('g').attr('transform', `translate(${margin.left} ${this.totalHeight - this.getScrollScaleHeight() - 4})`)
      this.createScrollScaleShape()
    }
  }

  getChartHeight() {
    let height = super.getChartHeight()
    if (this.isShowScrollScaleArea()) {
      height -= this.getScrollScaleHeight() + 4 // 30是x轴文字高度
    }
    return height
  }

  afterRender() {
    if (this.isShowScrollScaleArea()) {
      let s = this.getXDataLength() / 30
      if (s > 1) {
        this.gOut.call(this.zoom.transform, d3.zoomIdentity.translate(0, 0).scale(s))
      }
    }
  }

  render() {
    super.render()
    if (this.isShowScrollScaleArea()) {
      this.renderScrollScaleShape()
    }
  }

  createScrollScaleShape() {
    this.scrollScaleShape = new ScrollScaleShape(this.scrollScaleContainer, this.getScrollScaleHeight(), this.width, (newX) => {
      let {k, x, y} = this.transform
      let x1 = x - newX * k
      if (x1 > 0) {
        return
      }
      if (x1 < -this.width * (k - 1)) {
        return
      }
      let newTransform = d3.zoomIdentity.translate(x - newX * k, y).scale(k)
      this.gOut.call(this.zoom.transform, newTransform)
    })
  }

  renderScrollScaleShape() {
    let width = this.width / this.transform.k
    let x = -this.transform.x / this.transform.k
    this.getScrollScaleShape().draw(x, width)
  }

  getScrollScaleShape(): IShape {
    return this.scrollScaleShape
  }

  refresh(xData, yData, series, options) {
    super.refresh(xData, yData, series, options)
    this.createZoom()
    let s = this.getXDataLength() / 30
    if (this.isShowScrollScaleArea() && s > 1) {
      this.gOut.call(this.zoom.transform, d3.zoomIdentity.translate(0, 0).scale(s))
    } else {
      this.gOut.call(this.zoom.transform, d3.zoomIdentity)
    }
  }

  resize() {
    super.resize()
    this.xDataScale = this.xData.map(sub => sub.map(this.scaleX))
  }

  // 鼠标缩放、移动事件
  zoomed() {
    //@ts-ignore
    this.transform = d3.event.transform // 保存当前的transform
    //@ts-ignore
    let xz = d3.event.transform.rescaleX(this.scaleX)
    this.xDataScale = this.xData.map(sub => sub.map(xz))
    this.refreshXAxis()
    if (this.isShowScrollScaleArea()) {
      this.renderScrollScaleShape()
    }
  }

  refreshData(xData, yData, series) {
    super.refreshData(xData, yData, series)
    if (this.scrollScaleShape) {
      this.scrollScaleShape.destroy()
    }
    if (this.isShowScrollScaleArea()) {
      this.createScrollScaleShape()
    }
  }

  refreshXAxis() {
    let xz = this.scaleX
    if (this.transform) {
      xz = this.transform.rescaleX(this.scaleX)
    }
    let tickValuesToShow = this.calcTickValues(xz)
    this.getXAxisShape().scale(xz, tickValuesToShow)
  }

  getNearestInfo(mouseX) {
    if (mouseX < 0 || mouseX > this.width) {
      return null
    }
    let bisect = d3.bisector<{ n: number, index: number }, number>(d => d.n).left
    let result = null
    let minN = null
    this.xDataScale.forEach((line, lineIndex) => {
      if (this.hidedLineArray.indexOf(lineIndex) != -1) {
        return
      }
      let sortList = line
        .map((n, index) => ({n: Math.abs(n - mouseX), index})).sort((a, b) => a.n - b.n)
        .filter((item) => this.yData.find(yLine => yLine[item.index] != null) != undefined)
      if (sortList.length == 0) {
        return
      }
      let {index, n} = sortList[bisect(sortList, 0)]
      if (minN === null || minN > n) {
        minN = n
        result = {
          lineIndex,
          xIndex: index,
          x: line[index]
        }
      }
    })
    return result
  }
}
