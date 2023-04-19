const toStr = Object.prototype.toString

export enum TypeMap {
  NUMBER = '[object Number]',
  STRING = '[object String]',
  BOOLEAN = '[object Boolean]',
  ARRAY = '[object Array]',
  OBJECT = '[object Object]',
  FUNCTION = '[object Function]'
}

export const isString = (target: unknown): target is string =>
  toStr.call(target) === TypeMap.STRING

export const isArray = (target: unknown): target is any[] =>
  toStr.call(target) === TypeMap.ARRAY

export const isFn = (target: unknown): target is Function =>
  toStr.call(target) === TypeMap.FUNCTION

export const isObject = (target: unknown): target is Object =>
  toStr.call(target) === TypeMap.OBJECT
