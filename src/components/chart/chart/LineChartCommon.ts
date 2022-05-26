import StrokeLineShape from '../shapes/StrokeLineShape'
import YAxisShape from '../shapes/YAxisShape'
import BaseLineChart from '../core/BaseLineChart'
import LineShapeMulti from '../shapes/multi/LineShapeMulti'
import XAxisShapeMulti from '../shapes/multi/XAxisShapeMulti'
import {IShape} from '../core/BaseChart'

export class LineChartCommon extends BaseLineChart {
  lineShapes: IShape
  xAxisShape: IShape
  yAxisShape: IShape

  buildShapes() {
    super.buildShapes()
    this.xAxisShape = this.buildXAxisShape()
    this.yAxisShape = this.buildYAxisShape()
    this.lineShapes = this.buildLineShape()
    this.strokeLineShape = new StrokeLineShape(this.gOut, this.height)
  }

  getXAxisShape(): IShape {
    return this.xAxisShape
  }

  getYAxisShape(): IShape {
    return this.yAxisShape
  }

  getLineShape(): IShape {
    return this.lineShapes
  }

  getStrokeLineShape(): StrokeLineShape {
    return this.strokeLineShape
  }
}
