import { Selection } from 'd3-selection'
import { IShape } from '../../core/BaseChart'
import XAxisShape1 from '../XAxisShape1'
import { XAxisOption } from '../../index'
import SubLineShape from '../SubLineShape'
import {isEmpty} from '@/utils/commonUtil'

export default class XAxisShapeMulti implements IShape {
  container: Selection<any, any, any, any>
  xShapes: XAxisShape1[] = []
  subLines: IShape[] = []

  constructor(container, scaleX, scaleY, options: XAxisOption) {
    this.container = container
    let zeroHeight = scaleY(0) || options.height
    let minHeight = scaleY(options.yTickValues?.[0]) || options.height
    let zeroShape = new XAxisShape1(container, scaleX, zeroHeight, minHeight - zeroHeight + 10, 5, options.dateFormat, options.tickValues, options)
    this.xShapes.push(zeroShape)
    options.subLines?.forEach(v => {
      if (v != options.base && !isEmpty(v)) {
        this.subLines.push(
          new SubLineShape(container, options.left, options.width, scaleY(v), options.subAxisColor || '#e6e6e6')
        )
      }
    })
  }

  draw() {
    this.xShapes.forEach(shape => {
      shape.draw()
    })
  }

  scale(xz, tickValues) {
    this.xShapes.forEach((shape, index) => {
      if (index == 0) {
        shape.scale(xz, tickValues)
      } else {
        shape.scale(xz, [])
      }
    })
  }

  reset() {
    this.xShapes.forEach(shape => {
      shape.reset()
    })
  }

  destroy() {
    this.xShapes.forEach(shape => {
      shape.destroy()
    })
    this.subLines.forEach(shape => {
      shape.destroy()
    })
  }
}
