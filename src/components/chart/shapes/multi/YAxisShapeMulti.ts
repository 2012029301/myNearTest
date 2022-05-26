import { Selection } from 'd3-selection'
import YAxisShape from '../YAxisShape'
import { IShape } from '../../core/BaseChart'

export default class YAxisShapeMulti implements IShape {
  container: Selection<any, any, any, any>
  yShapes: YAxisShape[] = []

  constructor(container, yAxisList, series, scaleYs, tickFormat, width, options: any) {
    this.container = container
    for (let i = 0; i < yAxisList.length; i++) {
      let left
      if (i == 0) {
        left = 0
      } else if (i == 1) {
        left = width
      } else {
        left = (i - 1) * 50
      }
      let unit = series[yAxisList[i][0]]?.unit
      let yShape = new YAxisShape(container, scaleYs[i],
        {
          unit,
          tickFormat,
          direction: i == 1 ? 'right' : 'left',
          left,
          ...options
        })
      this.yShapes.push(yShape)
    }
  }

  draw() {
    this.yShapes.forEach(shape => {
      shape.draw()
    })
  }

  scale(xz) {
    this.yShapes.forEach(shape => {
      shape.scale(xz)
    })
  }

  reset() {
    this.yShapes.forEach(shape => {
      shape.reset()
    })
  }

  destroy() {
    this.yShapes.forEach(shape => {
      shape.destroy()
    })
  }
}
