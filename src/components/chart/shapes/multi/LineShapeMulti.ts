import LineShape from '../LineShape'
import { Item } from '../../core/chartConstants'
import { IShape } from '../../core/BaseChart'
import { GetColor } from '../../index'

export default class LineShapeMulti implements IShape {
  container: any
  xData: number[][]
  yData: []
  shapes = []
  getColorFn: GetColor
  options: any

  constructor(container, xData, yData, scaleX, getLineScaleY, hidedLineArray, options: any = {}) {
    this.container = container
    this.getColorFn = options.getColor
    this.options = options
    this.xData = xData
    this.yData = yData
    for (let i = 0; i < yData.length; i++) {
      if (hidedLineArray.indexOf(i) != -1) {
        this.shapes.push(null)
        continue
      }
      let lineShape = new LineShape(container, scaleX, getLineScaleY(i), {
        clipId: options.clipId,
        circleClipId: options.circleClipId,
        dashList: options.dashList,
        standardList: options.standardList,
        flags: options.flags,
        step: options.step
      })
      this.shapes.push(lineShape)
    }
  }

  draw() {
    this.shapes.forEach((shape, i) => {
      if (shape == null) {
        return
      }
      let data = this.getLineData(i)
      shape.draw(data, this.getColorFn(this.yData.length, i), `url(#${this.options.chartUniqueId}-${i})`)
    })
  }

  getLineData(lineIndex): Item[] {
    return this.xData[lineIndex].map((item, index) => {
      return {x: item, y: this.yData[lineIndex][index]}
    })
  }

  scale(xz) {
    this.shapes.forEach(shape => {
      shape != null && shape.scale(xz)
    })
  }

  reset() {
    this.shapes.forEach(shape => {
      shape != null && shape.reset()
    })
  }

  destroy() {
    this.shapes.forEach(shape => {
      shape != null && shape.destroy()
    })
  }
}
