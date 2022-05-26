import * as d3 from 'd3'
import { Selection } from 'd3-selection'
import { IShape } from '../core/BaseChart'
import { AxisOption } from '../index'

export default class XAxisShape implements IShape {
  xAxis: any
  container: Selection<any, any, any, any>
  path: Selection<any, any, any, any>
  option: AxisOption

  constructor(container, scaleX, dateFormat, ticks, transform = undefined, option: any) {
    this.container = container
    this.path = container.append('g').attr('style', `color: ${option.axisColor}`)
    this.option = option
    if (transform) {
      this.path.attr('transform', transform)
    }
    this.xAxis = d3.axisBottom(scaleX).tickFormat(dateFormat).tickPadding(10)
    if (typeof ticks != 'number') {
      this.xAxis.tickValues(ticks)
    } else {
      this.xAxis.ticks(ticks)
    }
  }

  draw() {
    this.path.call(this.xAxis)
    this.path.selectAll('text').attr('fill', this.option.axisTextColor).attr('font-size', this.option.axisFontSize)
  }

  scale(xz, tickValues) {
    this.xAxis.tickValues(tickValues)
    this.path.call(this.xAxis.scale(xz))
    this.path.selectAll('text').attr('fill', this.option.axisTextColor).attr('font-size', this.option.axisFontSize)
  }

  reset() {
    this.path.call(this.xAxis)
  }

  destroy() {
    this.path.remove()
  }
}
