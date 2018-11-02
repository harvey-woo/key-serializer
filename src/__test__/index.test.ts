import serializer from '..'
const obj = { a: [{ b: [1, 2], c: [3, 4] }, { b: [5, 6], c: [7, 8] }] }
test('stringify', () => {
  expect(serializer.stringify(['a', 1, 'c', 2])).toBe('a[1].c[2]')
})
test('parse', () => {
  expect(serializer.parse('a[1].c[2]')).toEqual(['a', 1, 'c', 2])
})
describe('test query', () => {
  test('with string', () => {
    const result = serializer.query(obj, 'a[1].b[1]')
    expect(result.value).toBe(6)
    expect(result.target).toBe(obj.a[1].b)
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
