import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  convertFromRaw,
  convertToRaw,
  CompositeDecorator,
  DefaultDraftBlockRenderMap,
  ContentState,
  Editor,
  EditorState,
  Entity,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  Modifier
} from 'draft-js';
 

/**
 * 输入框
 */
class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });
  }

  render() {
     const {editorState} = this.state;
        const {
        } = this.props;
        return(
          <div style={{background:'white'}}>
            <Editor 
                  editorState={editorState}
                  onChange = {this.onChange}
                  ref="editor"
              >
              </Editor>
              </div>
        )
  }
}


function mapStateToProps(state) {
  return state;
}



const page = connect(mapStateToProps, null)(InputBox);

/**
* InputBox
*/
export { page as InputBox };
