let uuid = 1

export type XData = number[] | string[] | number[][] | string[][]

export interface GradientColor {
  '0%': string,
  '100%': string,

  [key: string]: string,
}

export interface AxisOption {
  left?: number
  tickValues: number[]
  axisColor: string
  axisTextColor: string
  axisFontSize: number
  subAxisColor?: string
  dateFormat?: any
}

export interface XAxisOption extends AxisOption {
  dateFormat: any
  height: number
  width: number
  yTickValues: number[]
  subLines: number[]
  base: number
}

export interface YAxisOption extends AxisOption {
  direction: string
  unit: string
  tickFormat: any
}

export type GetColor = (count: number, index: number) => string
export const getUniqueId = () => {
  return uuid++
}
