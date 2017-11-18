import React from 'react'

class TransList extends React.Component {
  render () {
    return (
      <ul>
        {this.props.words.map((word, index) => {
          if (!word) return <li key={index} />

          if (word.definitions) {
            return <li key={index}>{word.definitions[0].translation}</li>
          } else {
            return <li key={index}>No result</li>
          }
        })}
      </ul>
    )
  }
}

export default TransList
