/* eslint-env jest */
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import camb from './cambridge'

const fixtureOfAs = fs.readFileSync(path.resolve(__dirname, './__fixtures__/apple-html.html')).toString()

describe('test searching result of "apple"', () => {
  beforeEach(() => {
    axios.get = () => new Promise(resolve => {
      resolve({ data: fixtureOfAs })
    })
  })

  test('par of speach', async () => {
    const result = await camb.search('apple')
    expect(result.definitions[0]).toBe('noun')
  })

  test('pronounciation', async () => {
    const result = await camb.search('apple')
    expect(result.definitions[0].pron).toBe({
      us: {
        audioSrc: 'https://dictionary.cambridge.org/media/english-chinese-traditional/us_pron/a/as_/as___/as.mp3',
        ipa: 'ˈæp.əl'
      }
    })
  })

  test('content', async () => {
    const result = await camb.search('apple')
    expect(result.definitions[0].content).toBe('a round fruit with firm, white flesh and a green, red, or yellow skin')
  })

  test('translation', async () => {
    const result = await camb.search('apple')
    expect(result.definitions[0].translation).toBe('蘋果')
  })
})
