import {Selection} from 'd3-selection'
import {IShape} from '../core/BaseChart'

export default class SimpleLineShape implements IShape {
  container: Selection<any, any, any, any>
  path: Selection<any, any, any, any>

  constructor(container, height, options: any = {}) {
    this.container = container
    this.path = container.append('line')
      .attr('class', 'simple-line')
      .attr('fill', '#fff')
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke', options.strokeColor || '#aaa')
      .attr('stroke-dasharray', options.dashArray ?? 5)
      .attr('display', 'none')
  }

  draw(x) {
    if (x == -1) {
      this.path.attr('display', 'none')
      return
    }
    this.path.attr('x1', x).attr('x2', x).attr('display', 'initial')
  }

  reset() {
    this.path.attr('display', 'none')
  }

  destroy() {
    this.path.remove()
  }
}
