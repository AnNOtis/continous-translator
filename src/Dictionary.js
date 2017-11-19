import React from 'react'
import styled from 'styled-components'
import pMemoize from 'p-memoize'

import TransList from './TransList'
import Editor from './Editor'
import camb from './libs/cambridge'
import * as array from './libs/array'

const Wrapper = styled.div`
  display: flex
`

const cacheableSearch = pMemoize(camb.search)

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

  searchWords (words) {
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
        })
      }, () => this.searchWord(word, index))
    })
  }

  searchWord (word, index) {
    cacheableSearch(word).then((searchResult) => {
      this.setState({
        words: array.replace(this.state.words, index,
          {
            ...this.state.words[index],
            ...searchResult,
            status: LOADED
          }
        )
      })
    })
  }

  render () {
    return (
      <Wrapper>
        <Editor onWordsChange={this.searchWords} />
        <TransList words={this.state.words} />
      </Wrapper>
    )
  }
}

export default Dictionary
