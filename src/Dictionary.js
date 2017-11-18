import React from 'react'
import styled from 'styled-components'

import TransList from './TransList'
import Editor from './Editor'
import camb from './libs/cambridge'
import * as array from './libs/array'

const SEARCHING = 'SEARCHING'
const SEARCHED = 'SEARCHED'

const Wrapper = styled.div`
  display: flex
`

class Dictionary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      words: []
    }

    this.addWord = this.addWord.bind(this)
    this.searchWord = this.searchWord.bind(this)
  }

  addWord (word) {
    console.log('word', word.content)
    const { lineNumber } = word
    this.setState({
      words: array.replace(
        this.state.words,
        lineNumber,
        {
          ...(this.state.words[lineNumber] || word),
          status: SEARCHING
        }
      )},
      () => { this.searchWord(word) }
    )
  }

  searchWord ({lineNumber, content}) {
    camb.search(content).then((result) => {
      this.setState({
        words: array.replace(this.state.words, lineNumber, {
          ...this.state.words[lineNumber],
          status: SEARCHED,
          definitions: result ? result.definitions : null
        })
      })
    })
  }

  render () {
    return (
      <Wrapper>
        <Editor onWordChange={this.addWord} />
        <TransList words={this.state.words} />
      </Wrapper>
    )
  }
}

export default Dictionary
