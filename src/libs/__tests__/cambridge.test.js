/* eslint-env jest */
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import camb from '../cambridge'
import appleParsingResult from '../__fixtures__/apple-parsing-result'
import shameParsingResult from '../__fixtures__/shame-parsing-result'

const fixtureOfApple = fs.readFileSync(path.resolve(__dirname, '../__fixtures__/apple-html.html')).toString()
const fixtureOfShame = fs.readFileSync(path.resolve(__dirname, '../__fixtures__/shame-html.html')).toString()

describe('search("apple")', () => {
  let result
  let expectation
  beforeEach(async () => {
    axios.get = () => new Promise(resolve => {
      resolve({ data: fixtureOfApple })
    })
    result = await camb.search('apple')
    expectation = appleParsingResult
  })

  test('par of speach', async () => {
    compareProp(obj => obj.collections[0].pos, result, expectation)
  })

  test('pronounciation', async () => {
    compareProp(obj => obj.collections[0].pron, result, expectation)
  })

  test('content', async () => {
    compareProp(obj => obj.collections[0].definitions[0].content, result, expectation)
  })

  test('translation', async () => {
    compareProp(obj => obj.collections[0].definitions[0].translation, result, expectation)
  })

  test('moreExamples', async () => {
    compareProp(obj => obj.collections[0].definitions[0].moreExamples, result, expectation)
  })
})

describe('search("unknown wordddddd")', () => {
  it('returns null', async () => {
    const fixtureOfNoResult = fs.readFileSync(path.resolve(__dirname, '../__fixtures__/no-result.html')).toString()

    axios.get = () => new Promise(resolve => {
      resolve({ data: fixtureOfNoResult })
    })

    const result = await camb.search('unknown wordddddd')
    expect(result).toBeNull()
  })
})

describe('search("shame")', () => {
  let result
  let expectation
  beforeEach(async () => {
    axios.get = () => new Promise(resolve => {
      resolve({ data: fixtureOfShame })
    })
    result = await camb.search('shame')
    expectation = shameParsingResult
  })

  test('collection 1', async () => {
    compareProp(obj => obj.collections[0], result, expectation)
  })

  test('collection 2', async () => {
    compareProp(obj => obj.collections[1], result, expectation)
  })

  test('collection 3', async () => {
    compareProp(obj => obj.collections[2], result, expectation)
  })
})

function compareProp (fn, receive, expected, log = false) {
  if (log) {
    console.log('receive', receive)
    console.log('expected', expected)
  }

  expect(fn(receive)).toEqual(fn(expected))
}
