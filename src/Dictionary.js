import React from 'react'
import styled from 'styled-components'
import pMemoize from 'p-memoize'
import { Howl } from 'howler'

import TransList from './TransList'
import Editor from './Editor'
import Definitions from './Definitions'
import camb from './libs/cambridge'
import * as array from './libs/array'

const Wrapper = styled.div`
  display: flex
`

const cacheableSearch = pMemoize(camb.search)
const cachedHowlInstance = {}

export const LOADING = 'LOADING'
export const REFRESHING = 'REFRESHING'
export const LOADED = 'LOADED'

class Dictionary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      words: []
    }

    this.searchWords = this.searchWords.bind(this)
    this.searchWord = this.searchWord.bind(this)
  }

  searchWords ({ words, currentLine }) {
    words.forEach((word, index) => {
      let status
      if (!words[index]) {
        status = LOADING
      } else if (words[index].content !== word) {
        status = REFRESHING
      }

      this.setState({
        words: array.replace(this.state.words, index, {
          content: word,
          status
        }),
        currentLine
      }, () => this.searchWord(word, index, { pronounce: index === currentLine }))
    })
  }

  searchWord (word, index, { pronounce = false }) {
    cacheableSearch(word).then((searchResult) => {
      this.setState({
        words: array.replace(this.state.words, index,
          {
            ...this.state.words[index],
            ...searchResult,
            status: LOADED
          }
        )
      }, () => {
        if (searchResult && pronounce) {
          const audioSource = searchResult.collections[0].pron.us.audioSrc
          if (!cachedHowlInstance[audioSource]) {
            const sound = new Howl({ src: [ audioSource ] })
            cachedHowlInstance[audioSource] = sound
          }

          cachedHowlInstance[audioSource].play()
        }
      })
    })
  }

  render () {
    return (
      <Wrapper>
        <Editor onWordsChange={this.searchWords} />
        <TransList words={this.state.words} />
        <Definitions word={this.state.words[this.state.currentLine]} />
      </Wrapper>
    )
  }
}

export default Dictionary
