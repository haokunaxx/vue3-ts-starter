const toStr = Object.prototype.toString

export const isString = (val: unknown): val is string =>
  toStr.call(val) === '[object String]'
