const toStr = Object.prototype.toString

enum TypeMap {
  NUMBER = '[object Number]',
  STRING = '[object String]',
  BOOLEAN = '[object Boolean]',
  ARRAY = '[object Array]',
  OBJECT = '[object Object]'
}

export const typeIs = (target: unknown, type: TypeMap): boolean =>
  toStr.call(target) === type

export const isString = (val: unknown): val is string =>
  toStr.call(val) === TypeMap.STRING

export const isArray = (val: unknown): val is any[] =>
  toStr.call(val) === TypeMap.ARRAY
