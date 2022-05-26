import _ from 'lodash'

import { IShape } from '../core/BaseChart'

export default class ScrollScaleShape implements IShape {
  scrollScaleContainer = null
  handleMousemove = null
  box = null
  current = null
  clicked = false
  x = -1

  constructor(container, height, width, onScroll) {
    this.scrollScaleContainer = container
    this.box = this.scrollScaleContainer.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('stroke', '#eee')
      .attr('fill', 'transparent')
    this.current = this.scrollScaleContainer.append('rect').attr('height', height).attr('cursor', 'ew-resize')
    this.handleMousemove = _.throttle((e) => {
      if (this.clicked) {
        let newX = e.clientX
        onScroll(newX - this.x)
        this.x = newX
      }
    }, 20, {trailing: true})
    document.addEventListener('mousedown', (e) => {
      this.x = e.clientX
    })
    this.current.on('mousedown', () => {
      this.clicked = true
    })
    document.addEventListener('mousemove', this.handleMousemove)
    document.addEventListener('mouseup', this.handleMouseup)
  }

  handleMouseup = () => {
    this.clicked = false
    this.x = -1
  }

  draw(x, width) {
    this.current.attr('x', x).attr('width', width).attr('fill', '#D5DBE4')
  }

  scale() {

  }

  reset() {

  }

  destroy() {
    document.removeEventListener('mousemove', this.handleMousemove)
    document.removeEventListener('mouseup', this.handleMouseup)
    this.box.remove()
    this.current.remove()
  }
}
