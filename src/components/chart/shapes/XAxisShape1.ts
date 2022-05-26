import * as d3 from 'd3'
import { Selection } from 'd3-selection'
import { IShape } from '../core/BaseChart'
import { AxisOption } from '../index'

/**
 *
 */
export default class XAxisShape1 implements IShape {
  xAxis: any
  container: Selection<any, any, any, any>
  path: Selection<any, any, any, any>
  axisTextColor
  option: AxisOption

  constructor(container, scaleX, axisHeight, tickPadding, tickSize, dateFormat, ticks, option: AxisOption) {
    this.option = option
    this.container = container
    this.path = container.append('g')
    this.axisTextColor = option.axisTextColor
    this.path.attr('transform', `translate(0, ${axisHeight})`)
    if (option.axisColor) {
      this.path.attr('color', option.axisColor)
    }

    this.xAxis = d3.axisBottom(scaleX).tickFormat(dateFormat).tickPadding(tickPadding).tickSize(tickSize)
    if (typeof ticks != 'number') {
      this.xAxis.tickValues(ticks)
    } else {
      this.xAxis.ticks(ticks)
    }
  }

  draw() {
    this.path.call(this.xAxis)
    this.path.selectAll('text').attr('fill', this.axisTextColor).attr('font-size', this.option.axisFontSize)
  }

  scale(xz, tickValues) {
    this.xAxis.tickValues(tickValues)
    this.path.call(this.xAxis.scale(xz))
    this.path.selectAll('text').attr('fill', this.axisTextColor).attr('font-size', this.option.axisFontSize)
  }

  reset() {
    this.path.call(this.xAxis)
  }

  destroy() {
    this.path.remove()
  }
}
