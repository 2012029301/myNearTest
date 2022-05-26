import * as d3 from 'd3'
import { Selection } from 'd3-selection'
import { IShape } from '../core/BaseChart'
import { YAxisOption } from '../index'

export default class YAxisShape implements IShape {
  yAxis: any
  container: Selection<any, any, any, any>
  path: Selection<any, any, any, any>
  unit: Selection<any, any, any, any>
  option: YAxisOption

  constructor(container, scaleY, option: YAxisOption) {
    this.container = container
    this.option = option
    this.path = container.append('g').attr('transform', `translate(${option.left}, 0)`).attr('style', `color: ${option.axisColor}`)
    this.unit = container.append('text').text(option.unit || '').attr('fill', option.axisTextColor).attr('font-size', 12)
    if (option.direction == 'left') {
      this.unit.attr('transform', `translate(${option.left - 10}, -25)`)
    } else {
      this.unit.attr('transform', `translate(${option.left - 3}, -25)`)
    }
    if (option.direction == 'left') {
      this.yAxis = d3.axisLeft(scaleY).tickValues(option.tickValues).tickFormat(option.tickFormat)
    } else {
      this.yAxis = d3.axisRight(scaleY).tickValues(option.tickValues).tickFormat(option.tickFormat)
    }
    this.yAxis.ticks(5)
  }

  draw() {
    this.path.call(this.yAxis)
    this.path.selectAll('text').attr('fill', this.option.axisTextColor).attr('font-size', this.option.axisFontSize)
  }

  scale(xz) {
    this.path.attr('d', this.yAxis.x(d => xz(d.x)))
  }

  reset() {
    this.path.call(this.yAxis)
  }

  destroy() {
    this.path.remove()
    this.unit.remove()
  }
}
