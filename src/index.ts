/** @ignore */
const r = /(?=(?:\[|\.))/
export type PublicKey = Exclude<PropertyKey, symbol>
export function parse(str: string): PublicKey[] {
  return str.split(r)
    .filter(item => item.trim())
    .map(item => item[0] === '.' ? item.substr(1) : (item[0] === '[' ? + item.substr(1, item.length - 2) : item))
}
export function stringify(arr: PublicKey[]): string {
  return arr.reduce((memo, item, i) =>
    memo += typeof item === 'number' ? `[${item}]` : i === 0 ? item : `.${item}`
  , '') as string
}
export function query(target: any, keys?: string | PublicKey[] | null) {
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
    // this line may throw when target is undefined, and i do not need handle
    value = target[key]
  }
  return { target, key, value }
}
export function get(target: object, keys: string | PublicKey[]): any {
  return query(target, keys).value
}
export function set(target: object, keys: string | PublicKey[], value: any): void {
  const result = query(target, keys)
  if (result.key !== undefined) {
    result.target[result.key] = value
  }
}
export default { stringify, parse, query, get, set }