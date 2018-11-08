import serializer from '..'
const obj = { a: [{ b: [1, 2], c: [3, 4] }, { b: [5, 6], c: [7, 8] }] }
test('stringify', () => {
  expect(serializer.stringify(['a', 1, 'c', 2])).toBe('a[1].c[2]')
})
test('parse', () => {
  expect(serializer.parse('a[1].c[2]')).toEqual(['a', 1, 'c', 2])
})
describe('test query', () => {
  test('with nullable', () => {
    const result = serializer.query(obj, null)
    expect(result.value).toBe(obj)
    const result2 = serializer.query(obj, '')
    expect(result2.value).toBe(obj)
  })
  test('with string', () => {
    const result = serializer.query(obj, 'a[1].b[1]')
    expect(result.value).toBe(6)
    expect(result.target).toBe(obj.a[1].b)
  })
  test('create target', () => {
    const target = { a: { } as any }
    serializer.query(target, 'a.b[0].c', true)
    expect(Array.isArray(target.a.b[0])).toBe(true)
  })
})
describe('test get', () => {
  test('with string', () => {
    expect(serializer.get(obj, 'a[1].b[1]')).toBe(6)
  })
  test('with arr', () => {
    expect(serializer.get(obj, ['a', 1, 'b', 1])).toBe(6)
  })
})
describe('test set', () => {
  test('set', () => {
    const obj = { a: [{ b: [1, 2], c: [3, 4] }, { b: [5, 6], c: [7, 8] }] }
    serializer.set(obj, 'a[1].b[1]', 2)
    expect(obj.a[1].b[1]).toBe(2)
  })
  test('set nothing', () => {
    const s = { a: 1 }
    const b = JSON.parse(JSON.stringify(s))
    serializer.set(s, null, 2)
    expect(s).toEqual(b)
  })  
})
