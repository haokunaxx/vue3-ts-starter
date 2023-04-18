const toStr = Object.prototype.toString
export enum IsTypeList {
  STRING = '[object String]',
  ARRAY = '[object Array]'
}
export const isString = (val: unknown): val is string =>
  toStr.call(val) === '[object String]'

export const typeIs = (target: unknown, type: IsTypeList): boolean =>
  toStr.call(target) === type
