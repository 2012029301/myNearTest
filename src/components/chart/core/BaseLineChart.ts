import * as d3 from 'd3'
import {ScaleLinear} from 'd3-scale'
import {BaseScaleChart} from './BaseScaleChart'
import {IShape} from './BaseChart'
import LineShapeMulti from '../shapes/multi/LineShapeMulti'
import StrokeLineShape from '../shapes/StrokeLineShape'
import {isEmpty} from '../chartUtil'

class BaseLineChart extends BaseScaleChart {
  strokeLineShape: StrokeLineShape // 鼠标移入的虚线

  getStrokeLineShape() {
    return this.strokeLineShape
  }

  getLineShape(): IShape {
    throw new Error('')
  }

  handleTooltip(info) {
    if (info === null) {
      this.getStrokeLineShape().reset()
      return
    }
    let {lineIndex, xIndex, x} = info
    let yCircles = []
    for (let i = 0; i < this.yData.length; i++) {
      if (this.hidedLineArray.indexOf(i) == -1 && !isEmpty(this.yData[i][xIndex])) {
        yCircles.push({
          y: this.getLineScaleY(i)(this.yData[i][xIndex]),
          color: this.options.getColor(this.yData.length, i)
        })
      }
    }
    this.getStrokeLineShape().refresh(x, yCircles)
    if (x < this.getLeft() || x > this.width) {
      this.getStrokeLineShape().reset()
    }
    if (lineIndex == this.beforeLineIndex && xIndex == this.beforeXIndex) {
      return
    }
    this.emit('xIndexChange', {lineIndex, xIndex})
    this.beforeLineIndex = lineIndex
    this.beforeXIndex = xIndex
  }

  handleMouseLeave() {
    setTimeout(() => {
      this.getStrokeLineShape().reset()
    }, 5)
  }

  /**
   * 对应折线的scaleY值
   * @param index
   */
  getLineScaleY(index): ScaleLinear<number, number> {
    return this.scaleY
  }

  buildLineShape(): IShape {
    return new LineShapeMulti(this.gOut, this.xData, this.yData, this.scaleX, (index) => this.getLineScaleY(index), this.hidedLineArray, {
      getColor: this.options.getColor,
      chartUniqueId: this.options.chartUniqueId,
      clipId: this.clipId,
      circleClipId: this.circleClipId,
      dashList: this.options.dashList,
      standardList: this.options.standardList,
      flags: this.options.flags,
      step: this.options.step
    })
  }

  renderLine() {
    this.getLineShape().draw()
  }

  render() {
    super.render()
    this.renderLine()
  }

  zoomed() {
    super.zoomed()
    //@ts-ignore
    let xz = d3.event.transform.rescaleX(this.scaleX)
    this.getLineShape().scale(xz)
    if (this.xIndex != -1) {
      this.getStrokeLineShape().reset()
    }
  }

  refreshData(xData, yData, series) {
    super.refreshData(xData, yData, series)
    this.getLineShape().destroy()
    this.getStrokeLineShape().destroy()
  }

  destroy() {
    super.destroy()
    this.getStrokeLineShape().destroy()
    this.getLineShape().destroy()
  }
}

export default BaseLineChart
