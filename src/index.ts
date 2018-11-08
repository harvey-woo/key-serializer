/** @ignore */
const r = /(?=(?:\[|\.))/
/** means a iterable object key, includes string and number, but symbol */
export type PublicKey = Exclude<PropertyKey, symbol>
/**
 * parse a string to [[PublicKey]] array
 * 
 * ```javascript
 *  parse('a[0].b[2]') // => ['a', 0, 'b', 2]
 * ```
 * 
 * @param str the string you wanna parse
 */
export function parse(str: string): PublicKey[] {
  return str.split(r)
    .filter(item => item.trim())
    .map(item => item[0] === '.' ? item.substr(1) : (item[0] === '[' ? + item.substr(1, item.length - 2) : item))
}
/**
 * stringify [[PublicKey]] array to string
 * 
 * ```javascript
 * stringify(['a', 0, 'b', 2]) // => 'a[0].b[2]'
 * 
 * **notice**: number key will be converted to ```'[xxx]'```, and string key will be converted to ```.xxx```
 * ```
 * 
 * @param arr the key arr you wanna stringify
 */
export function stringify(arr: PublicKey[]): string {
  return arr.reduce((memo, item, i) =>
    memo += typeof item === 'number' ? `[${item}]` : i === 0 ? item : `.${item}`
  , '') as string
}
/**
 * query the result from target by keys
 * @param target 
 * @param keys 
 * @param createdTarget if it's ```true```, this funciton will create object or array when necessary
 * ```javascript
 * const obj = { a: { b: [1, 2] } }
 * query(obj, 'a.b[0]') // => { target: [1, 2], key: 0, value: 1 }
 * ```
 * or with **createTarget** param
 * ```javascript
 * const obj = { }
 * query(obj, 'a.b[0]', true) => { target: [], key: 0, value: undefined }
 * ```
 * 
 */
export function query(target: any, keys?: string | PublicKey[] | null, createdTarget = false) {
  if (keys == null || keys === '') {
    return { target, key: undefined, value: target }
  }
  if (typeof keys === 'string') {
    keys = parse(keys) as PublicKey[]
  } else {
    keys = keys.slice() as PublicKey[]
  }
  let value = target
  let key: PublicKey | undefined
  while (keys.length) {
    target = value
    key = keys.shift()!
    if (target[key] === undefined && createdTarget) {
      if (typeof key === 'number') {
        target[key] = []
      } else {
        target[key] = {}
      }
    }
    // this line may throw when target is undefined, and i do not need handle
    value = target[key]
  }
  return { target, key, value }
}
/**
 * deepin target, and get value or keys from target
 * @param target 
 * @param keys 
 * 
 * it is only a alias of ```query(obj, keys).value```
 * 
 * ```javascript
 * 
 * const obj = { a: { b: [1, 2] } }
 * query(obj, 'a.b[0]') // => 1
 * 
 * ```
 * 
 */
export function get(target: object, keys: string | PublicKey[] | null): any {
  return query(target, keys).value
}
/**
 * deepin target, and set value of keys from target
 * @param target 
 * @param keys 
 * @param value 
 * 
 * ```javascript
 * 
 * const obj = { a: { b: [1, 2] } }
 * query(obj, 'a.b[0]', 3)
 * obj.a.b[0] === 3 // => true
 * 
 * ```
 */
export function set(target: object, keys: string | PublicKey[] | null, value: any): void {
  const result = query(target, keys)
  if (result.key !== undefined) {
    result.target[result.key] = value
  }
}
export default { stringify, parse, query, get, set }