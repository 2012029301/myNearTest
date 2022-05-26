import {Selection} from 'd3-selection'
import {IShape} from '../core/BaseChart'

export default class StrokeLineShape implements IShape {
  container: Selection<any, any, any, any>
  path: Selection<any, any, any, any>
  linePath: Selection<any, any, any, any>
  circles: Selection<any, any, any, any>

  constructor(container, height, options: any = {}) {
    this.container = container
    this.path = container.append('g').attr('id', 'point-info-box').attr('fill', '#fff')
    this.linePath = this.path.append('line')
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke', options.strokeColor || '#aaa')
      .attr('stroke-dasharray', options.dashArray ?? 5)
      .attr('display', 'none')
    this.circles = container.append('g').attr('class', 'circles')
  }

  refresh(x, yCircles = []) {
    this.circles.selectAll('circle').remove()
    yCircles.forEach((item)=> {
      this.circles.append('circle')
        .attr('cx', x)
        .attr('cy', item.y)
        .attr('r', 5)
        .attr('fill', '#fff')
        .attr('stroke', item.color)
    })
    if (x == -1) {
      this.linePath.attr('display', 'none')
      return
    }
    this.linePath.attr('x1', x).attr('x2', x).attr('display', 'initial')
  }

  reset() {
    this.linePath.attr('display', 'none')
    this.circles.selectAll('circle').remove()
  }

  destroy() {
    this.linePath.remove()
    this.path.remove()
    this.circles.selectAll('circle').remove()
  }
}
