import React from 'react'
import { LOADING, REFRESHING } from './Dictionary'

class TransList extends React.Component {
  render () {
    return (
      <ul>
        {this.props.words.map((word, index) => {
          if (!word || !word.content) return <li key={index} />
          if (word.status === LOADING || word.status === REFRESHING) {
            return <li key={index}>loading...</li>
          }
          if (word.definitions) {
            return <li key={index}>{word.definitions[0].translation}</li>
          } else {
            return <li key={index} />
          }
        })}
      </ul>
    )
  }
}

export default TransList
