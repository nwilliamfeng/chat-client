import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AtomicBlockUtils, Editor, EditorState, Entity, RichUtils, convertToRaw } from 'draft-js';
require('../../assets/styles/button.css');

const sendButtonStyle = {
  paddingTop: 2,
  paddingLeft: 15,
  paddingBottom: 2,
  paddingRight: 15,
 
  border: '1px solid lightGrey',
  
  background: 'none',
  color:'grey',
  outline: 'none',
}

 

/**
 * 输入框
 */
class InputBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      showURLInput: false,
      url: '',
      urlType: '',
    };

    // this.focus = () => this.editor.focus();
    // this.logState = () => {
    //   const content = this.state.editorState.getCurrentContent();
    //   console.log(convertToRaw(content));
    // };
    // this.onChange = (editorState) => this.setState({editorState});
    // this.onURLChange = (e) => this.setState({urlValue: e.target.value});

    // this.addImage = this._addImage.bind(this);
    // this.confirmMedia = this._confirmMedia.bind(this);
    // this.handleKeyCommand = this._handleKeyCommand.bind(this);
    // this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this);
  }

  render() {
    const { editorState } = this.state;
    const {
    } = this.props;
    return (
      <div>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          ref="editor"  >
        </Editor>
        <button className='send-msg-btn'>{'发送'}</button>
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
