import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: block;
  margin: 12px;
  border: 1px solid #999;
  width: 300px;
  height: inherit;
`

const Word = styled.div`
  display: block;
  font-weight: bold;
  font-size: 18px;
`

const Definition = styled.div`
  margin: 12px;
  background-color: #ffe28e;
`

const Pos = styled.div``
const Pron = styled.div``
const Explaination = styled.div``
const Trans = styled.div``
const Examples = styled.ul``
const MoreExamples = styled.ul``

class Definitions extends React.Component {
  render () {
    if (!this.props.word || !this.props.word.collections) return null

    const {
      content,
      collections
    } = this.props.word

    return (
      <Wrapper>
        <Word>{content}</Word>
        {collections.map(collection => this.renderDefinition(collection))}
      </Wrapper>
    )
  }

  renderDefinition (collection) {
    const { pos, pron } = collection
    const definition = collection.definitions[0]
    return (
      <Definition key={definition.content}>
        <Pos>{pos}</Pos>
        <Pron>{pron && pron.us.ipa}</Pron>
        <Explaination>{definition.content}</Explaination>
        <Trans>{definition.translation}</Trans>
        <Examples>
          {definition.examples.map(example => <li key={example.content}><div>{example.content}</div><div>{example.translation}</div></li>)}
        </Examples>
        <MoreExamples>
          {definition.moreExamples.map(example => <li key={example}>{example}</li>)}
        </MoreExamples>
      </Definition>
    )
  }
}

export default Definitions
