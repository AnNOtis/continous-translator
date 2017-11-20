/* eslint-env jest */

import { insert, replace } from '../array'

describe('array.*', () => {
  describe('array.insert()', () => {
    test('returns new array with specific element inserted', () => {
      const oldArr = [1, 2, 3]
      const newArr = insert(oldArr, 1, '*')
      expect(newArr).toEqual([1, '*', 2, 3])
    })

    test('generates new Array', () => {
      const oldArr = [1, 2, 3]
      const newArr = insert(oldArr, 1, '*')
      expect(newArr).not.toEqual(oldArr)
    })

    test('insert into head position', () => {
      const oldArr = [1, 2, 3]
      const newArr = insert(oldArr, 0, '*')
      expect(newArr).toEqual(['*', 1, 2, 3])
    })

    test('if old array is shorten than index number, `undefined` will be a complement', () => {
      const oldArr = [1, 2, 3]
      const newArr = insert(oldArr, 5, '*')
      expect(newArr).toEqual([1, 2, 3, undefined, undefined, '*'])
    })
  })

  describe('array.replace', () => {
    test('replace targeting index', () => {
      const oldArr = [1, 2, 3]
      const newArr = replace(oldArr, 1, '*')
      expect(newArr).toEqual([1, '*', 3])
    })

    test('if old array is shorten than index number, `undefined` will be a complement', () => {
      const oldArr = [1, 2, 3]
      const newArr = replace(oldArr, 5, '*')
      expect(newArr).toEqual([1, 2, 3, undefined, undefined, '*'])
    })
  })
})
