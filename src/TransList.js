import React from 'react'

class TransList extends React.Component {
  render () {
    return (
      <ul>
        {this.props.words.map(word => {
          if (!word) return <li key={word.lineNumber} />

          switch (word.status) {
            case 'SEARCHED':
              if (word.definitions) {
                return <li key={word.lineNumber}>{word.definitions[0].translation}</li>
              } else {
                return <li key={word.lineNumber}>not a word</li>
              }
            case 'SEARCHING':
              return <li key={word.lineNumber}>searching...</li>
            default:
              return <li key={word.lineNumber}>no</li>
          }
        })}
      </ul>
    )
  }
}

export default TransList
