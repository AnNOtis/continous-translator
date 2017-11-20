/* eslint-env jest */
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import camb from '../cambridge'
import appleParsingResult from '../__fixtures__/apple-parsing-result'

const fixtureOfAs = fs.readFileSync(path.resolve(__dirname, '../__fixtures__/apple-html.html')).toString()

describe('search("apple")', () => {
  let result
  let expectation
  beforeEach(async () => {
    axios.get = () => new Promise(resolve => {
      resolve({ data: fixtureOfAs })
    })
    result = await camb.search('apple')
    expectation = appleParsingResult
  })

  test('par of speach', async () => {
    compareProp(obj => obj.definitions[0].pos, result, expectation)
  })

  test('pronounciation', async () => {
    compareProp(obj => obj.definitions[0].pron, result, expectation)
  })

  test('content', async () => {
    compareProp(obj => obj.definitions[0].content, result, expectation)
  })

  test('translation', async () => {
    compareProp(obj => obj.definitions[0].translation, result, expectation)
  })

  test('moreExamples', async () => {
    compareProp(obj => obj.definitions[0].moreExamples, result, expectation)
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

function compareProp (fn, receive, expected, log = false) {
  if (log) {
    console.log('receive', receive)
    console.log('expected', expected)
  }

  expect(fn(receive)).toEqual(fn(expected))
}
