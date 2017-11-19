import React from 'react'
import { Editor, EditorState } from 'draft-js'
import styled from 'styled-components'
import debouce from 'lodash/debounce'

const Wrapper = styled.div`
  border: 1px solid #333;
  width: 300px;
  height: 500px;
  font-size: 14px;
  line-height: 18px;
  margin: 0;
  padding: 0;
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
    this.handleContentChange = this.handleContentChange.bind(this)
    this.debouncedProcessContentChange = debouce(
      this.handleContentChange,
      500
    )
  }

  handleChange (editorState) {
    this.setState({
      editorState
    }, this.debouncedProcessContentChange)
  }

  handleContentChange () {
    const anchorKey = this.state.editorState.getSelection().getAnchorKey()
    const blocks = this.state.editorState.getCurrentContent()
      .getBlockMap()
      .toArray()

    const currentLine = blocks.findIndex(block => anchorKey === block.key)
    const words = blocks.map(block => block.getText())

    this.props.onWordsChange({ words, currentLine: currentLine })
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
