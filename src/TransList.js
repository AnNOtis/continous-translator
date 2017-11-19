import React from 'react'
import { LOADING, REFRESHING } from './Dictionary'
import styled from 'styled-components'

const List = styled.ul`
  margin: 0;
  padding: 0;
`

const Item = styled.li`
  font-size: 14px;
  line-height: 18px;
  margin-left: 24px;
`

class TransList extends React.Component {
  render () {
    return (
      <List>
        {this.props.words.map((word, index) => {
          if (!word || !word.content) return <Item key={index} />
          if (word.status === LOADING || word.status === REFRESHING) {
            return <Item key={index}>loading...</Item>
          }
          if (word.definitions) {
            return <Item key={index}>{word.definitions[0].translation}</Item>
          } else {
            return <Item key={index} />
          }
        })}
      </List>
    )
  }
}

export default TransList
