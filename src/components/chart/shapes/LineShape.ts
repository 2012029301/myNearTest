import * as d3 from 'd3'
import {Item} from '../core/chartConstants'
import {Selection} from 'd3-selection'
import {IShape} from '../core/BaseChart'

export default class LineShape implements IShape {
  options: any
  line: any
  area: any
  container: Selection<any, any, any, any>
  lines: Selection<any, any, any, any>
  circles: Selection<any, any, any, any>
  backGrounds: Selection<any, any, any, any>
  scaleX: any
  scaleY: any
  data: Item[]
  circleData: Item[]

  constructor(container, scaleX, scaleY, options) {
    const {clipId, circleClipId} = options
    this.options = options
    this.container = container
    this.lines = container.append('g').attr('class', 'lines').attr('stroke-width', 1).attr('clip-path', `url(#${clipId})`)
    this.backGrounds = container.append('g').attr('class', 'backGrounds').attr('clip-path', `url(#${clipId})`)
    this.circles = container.append('g').attr('class', 'circles').attr('clip-path', `url(#${circleClipId})`)
    this.scaleX = scaleX
    this.scaleY = scaleY
    this.line = d3.line<Item>().x(d => scaleX(d.x)).y((d) => scaleY(d.y))
    this.area = d3.area<Item>().x0(d => scaleX(d.x)).y0(d => scaleY(d.y)).x1(d => scaleX(d.x)).y1(scaleY(0))
  }

  draw(data, color, bgColor) {
    this.data = data

    let lines = [data]
    let circles = []

    this.circleData = circles
    this.lines.selectAll('path').data(lines).enter().append('path')
      .attr('stroke', color)
      .attr('fill', 'none')
      .attr('d', (d) => {
        return this.line(d)
      })
    this.circles.selectAll('circle').data(circles).enter().append('circle')
      .attr('cx', (d: Item) => this.scaleX(d.x))
      .attr('cy', (d: Item) => this.scaleY(d.y || 0))
      .attr('r', 2)
      .attr('fill', '#fff')
      .attr('stroke', color)

    this.backGrounds.selectAll('path').data(lines).enter().append('path')
      .attr('stroke', 'none')
      .style('fill', bgColor)
      .attr('d', (d, index) => {
        return this.area(d)
      })
  }

  scale(xz) {
    let line1 = this.line.x(d => xz(d.x))
    let area1 = this.area.x(d => xz(d.x))
    this.lines.selectAll('path').attr('d', (d) => {
      return line1(d)
    })
    this.backGrounds.selectAll('path').attr('d', (d) => {
      return area1(d)
    })
    this.circles.selectAll('circle')
      .attr('cx', (d: Item) => xz(d.x))
  }

  reset() {

  }

  destroy() {
    this.lines.remove()
    this.backGrounds.remove()
    this.circles.remove()
  }
}
