# key-serializer
serilize keys and query keys deep in an object

[documentation](https://harvey-woo.github.io/key-serializer/index.html)

[![npm version](https://img.shields.io/npm/v/@cat5th/key-serializer.svg?style=flat-square)](https://www.npmjs.com/package/@cat5th/key-serializer)
[![coverage](https://img.shields.io/codecov/c/github/harvey-woo/key-serializer.svg?style=flat-square)](https://codecov.io/gh/harvey-woo/key-serializer)
[![npm downloads](https://img.shields.io/npm/dt/@cat5th/key-serializer.svg?style=flat-square)](https://www.npmjs.com/package/@cat5th/key-serializer)
[![Build Status](https://img.shields.io/travis/harvey-woo/key-serializer.svg?style=flat-square)](https://travis-ci.org/harvey-woo/key-serializer)

## how to use
It is very easy to get value of keys deep into your object, or stringify keys to a string from array

### import serializer
```javascript
import keySerializer from '@cat5th/key-serializer'
```

### stringify keys

```javascript
keySerializer.stringify(['a', 1, 'b', 0])
// result: "a[1].b[0]"
```
### parse keys

```javascript
keySerializer.parse('a[1].b[0]')
// result: ['a', 1, 'b', 0]
```
### query object

```javascript
const obj = { a: [{ b: [1, 2], c: [3, 4] }, { b: [5, 6], c: [7, 8] }] }
keySerializer.query(obj, 'a[1].b[0]')
// result: { value: 5, key: 0, target: [5, 6]}
```
### get value
```javascript
keySerializer.get(obj, 'a[1].b[0]')
// result: 5
```

### set value
```javascript
keySerializer.set(obj, 'a[1].b[0]', 1)
console.log(obj.a[1].b[0])
// result: 1
```
> **notice**: get/set/query function will throw TypeError when target is null or undefined, keep in mind, and always use get/query in try block
