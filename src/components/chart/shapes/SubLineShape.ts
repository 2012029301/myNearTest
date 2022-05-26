import { IShape } from '../core/BaseChart'

export default class SubLineShape implements IShape {
  container: any
  line: any

  constructor(container, x1, x2, y, color) {
    this.container = container
    let y1 = Math.floor(y) + 0.5 // 解决line模糊问题
    this.line = container.append('line')
      .attr('x1', x1)
      .attr('x2', x2)
      .attr('y1', y1)
      .attr('y2', y1)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-dasharray', '3,3')
  }

  draw() {

  }

  scale() {

  }

  reset() {

  }

  destroy() {
    this.line.remove()
  }
}
