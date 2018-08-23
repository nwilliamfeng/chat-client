import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AtomicBlockUtils, Editor, EditorState, RichUtils, convertToRaw, } from "draft-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage as farImage,faFolder as farFolder,faSmile as farSmile} from '@fortawesome/free-regular-svg-icons';
 
import ReactTooltip from 'react-tooltip';
require('../../assets/styles/button.css');
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

const inputStyle = {
  display: 'none',
}


const Image = ({ src }) => {
  return <img src={src} style={styles.media} />;
};


const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  return <Image src={src} />;
};

const styles = {

  buttons: {
    marginBottom: 10,
  },


  editor: {

    cursor: 'text',
    minHeight: 80,


  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  media: {
    maxWidth: 120,
    minWidth: 16,
    whiteSpace: 'initial',

  },
};

/**
 * 输入框
 */
class InputBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.focus = () => {
      this.refs.editor.focus();
    }

    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
    };

    this.onChange = (editorState) => {
      this.setState({ editorState }); //在编辑器内容被更改后重新重新设置状态
    }

  

    this.onImgUrlChange = this.onImgUrlChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onPopupEmojis =this.onPopupEmojis.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }


  onPopupEmojis(){
    console.log();
  }

  onImgUrlChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    try {

      reader.readAsDataURL(file);//读取文件选择器的base64内容
      reader.onload = () => {
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: reader.result });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        this.setState({ editorState: AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ') });
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
    catch (e) {
      console.log(e);
    }

  };



  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }


  renderInput = () => {
    return (
      <div style={{ padding: 5 }} >
        <label data-tip="表情" onClick={onPopupEmojis} className="label-toolbar"> <FontAwesomeIcon icon={farSmile} size='lg' /></label>
        <label for="uploadPhoto" data-tip="发送图片" className="label-toolbar"> <FontAwesomeIcon icon={farImage} size='lg' /></label>
        <input id="uploadPhoto" type='file' style={inputStyle} onChange={this.onImgUrlChange} accept="image/*" />
        <label for="uploadFile" data-tip="发送文件" className="label-toolbar"> <FontAwesomeIcon icon={farFolder} size='lg' /></label>
        <input type='file' id="uploadFile" style={inputStyle} accept=".xls,.xlsx,.doc,.docx,.txt,.pdf,.zip" />
        <ReactTooltip />
      </div>
    )
  }



  render() {
    return (
      <div style={styles.root}>
        {this.renderInput()}
        <div className='scollContainer editor-container'>
          <div style={styles.editor} onClick={this.focus} style={styles.editor} >
            <Editor
              blockRendererFn={mediaBlockRenderer}
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}

              ref="editor"
            />
          </div>
        </div>

        <button className='send-msg-btn'>{'发送'}</button>
      </div>
    );
  }




  // render() {

  //   return (
  //     <div>



  //       <div className='scollContainer editor-container'>

  //         <div    >
  //         <Editor
  //           editorState={this.state.editorState}
  //           onChange={this.onChange}

  //           ref={element => {
  //             this.editor = element;
  //           }}
  //         />
  //         </div>

  //       </div>
  //       <button className='send-msg-btn'>{'发送'}</button>

  //     </div>
  //   )
  // }


}


function mapStateToProps(state) {
  return state;
}



const page = connect(mapStateToProps, null)(InputBox);

/**
* InputBox
*/
export { page as InputBox };
