import React from 'react'
import { Editor, EditorState } from 'draft-js'
import styled from 'styled-components'
import debouce from 'lodash/debounce'

const Wrapper = styled.div`
  font-size: 14px;
  border: 1px solid #333;
  width: 300px;
  height: 500px;
`

const EDITOR_STYLE = {
  display: 'block',
  height: '100%',
  width: '100%'
}

class CustomEditor extends React.Component {
  constructor (props) {
    super(props)

    this.state = {editorState: EditorState.createEmpty()}

    this.handleChange = this.handleChange.bind(this)
    this.processContentChange = this.processContentChange.bind(this)
    this.debouncedProcessContentChange = debouce(
      this.processContentChange,
      500
    )
  }

  handleChange (editorState) {
    this.setState({
      editorState
    }, this.debouncedProcessContentChange)
  }

  processContentChange () {
    const words = this.state.editorState.getCurrentContent()
      .getBlockMap()
      .toArray()
      .map(block => block.getText())

    this.props.onWordsChange(words)
  }

  render () {
    return (
      <Wrapper>
        <Editor
          style={EDITOR_STYLE}
          editorState={this.state.editorState}
          onChange={this.handleChange}
          ref={(input) => { this.textInput = input }} />
        />
      </Wrapper>
    )
  }
}

export default CustomEditor
