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
    this.handleWordChange = debouce(() => {
      this.props.onWordChange(this.getWord(this.state.editorState))
    }, 500)

    this.onChange = (editorState) => {
      this.setState({
        editorState
      }, this.handleWordChange)
    }
  }

  getWord (editorState) {
    const selectionState = editorState.getSelection()

    const anchorKey = selectionState.getAnchorKey()
    const currentContent = editorState.getCurrentContent()
    const currentContentBlock = currentContent.getBlockForKey(anchorKey)

    return {
      content: currentContentBlock.getText(),
      lineNumber: currentContent.getBlockMap().toArray().findIndex(block => anchorKey === block.key)
    }
  }

  render () {
    return (
      <Wrapper>
        <Editor
          style={EDITOR_STYLE}
          editorState={this.state.editorState}
          onChange={this.onChange}
          ref={(input) => { this.textInput = input }} />
        />
      </Wrapper>
    )
  }
}

export default CustomEditor
