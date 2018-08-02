import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AtomicBlockUtils, Media, Editor, EditorState, Entity, RichUtils, convertToRaw } from 'draft-js';
import ReactFileReader from 'react-file-reader';
require('../../assets/styles/button.css');
require('../../../node_modules/draft-js/dist/Draft.css');
require('../../assets/styles/scrollbar.css');
require('../../assets/styles/input-box.css');

const mediaBlockRenderer = (block) => {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}


/**
 * 输入框
 */
class InputBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),

      url: '',
      urlType: '',
    };

    this.focus = () => this.editor.focus();
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
    };
    this.onChange = (editorState) => this.setState({ editorState });
    this.onURLChange = (e) => {
      this.setState({ urlValue: e.target.value });
    }
    this.addImage = this._addImage.bind(this);

    this.confirmMedia = this._confirmMedia.bind(this);
    // this.handleKeyCommand = this._handleKeyCommand.bind(this);
    //this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this);

  }

  _addImage() {
    this._promptForMedia('image');
  }

  _confirmMedia(e) {
    e.preventDefault();
    const { editorState, urlValue, urlType } = this.state;
    const entityKey = Entity.create(urlType, 'IMMUTABLE', { src: urlValue })

    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
      ),
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.focus(), 0);
    });
  }

  _promptForMedia(type) {
    const { editorState } = this.state;
    this.setState({
      showURLInput: true,
      urlValue: '',
      urlType: type,
    }, () => {
      setTimeout(() => this.url.focus(), 0);
    });
  }

  handleFiles(files) {
    console.log(files.base64)
  }

  render() {
    const { editorState } = this.state;
    const {
    } = this.props;
    return (
      <div  >
        <ReactFileReader fileTypes={[".jpg", ".png"]} base64={true} multipleFiles={true} handleFiles={this.handleFiles}>
          <button className='btn'>Upload</button>
        </ReactFileReader>
        <div  >
          <input onChange={this.onURLChange} ref="url" type="file" value={this.state.urlValue} onKeyDown={this.onURLInputKeyDown}
          />
          <button onMouseDown={this.confirmMedia}>
            Confirm
                </button>
        </div>

        <div className='scollContainer editor-container'>
          <Editor
            blockRendererFn={mediaBlockRenderer}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder="Enter some text..."
            ref={(ref) => this.editor = ref} />
        </div>
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
