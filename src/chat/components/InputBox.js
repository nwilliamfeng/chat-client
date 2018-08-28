import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defaultEmojiMapping } from '../defaultEmojiMapping';
import { AtomicBlockUtils, Modifier, Editor, EditorState, RichUtils, convertToRaw, CompositeDecorator } from "draft-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage as farImage, faFolder as farFolder, } from '@fortawesome/free-regular-svg-icons';
import ReactTooltip from 'react-tooltip';
import { renderEmojiPanel } from './EmojiTab';
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
  return <img src={src} style={styles.img} />;
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

  toolbar:{
    padding:5,
  },

  editor: {
    cursor: 'text',
    minHeight: 80,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  img: {
    maxWidth: 120,
    minWidth: 16,
    whiteSpace: 'initial',

  },

  
};

const emojiStyle=(imgSrc)=>{
  return{
    padding:0,
    backgroundImage: `url(${imgSrc})`, 
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right', 
    backgroundSize: 19,
    color:'transparent',
    ????
  }
}

/**
 * 
 * @param {*} regex 
 * @param {*} contentBlock 
 * @param {*} callback 
 */
const findWithRegex = (regex, contentBlock, callback) => {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
   // callback(start, start + matchArr[0].length);
   callback(start , start +2);
  }
};

 


const decorator = new CompositeDecorator([
  //处理表情
  {
    strategy: (contentBlock, callback, contentState) => {
     // const emojiRegex = /\[+\:[^\[\]]+\]/g; //正则判断 
     const emojiRegex=/[\uD800-\uDBFF]/g;
      findWithRegex(emojiRegex, contentBlock, callback);
    },
    
    component: (props) => {
      const character = props.decoratedText ;
      const emoji = defaultEmojiMapping.getEmojiByCharacter(character);
      if (emoji == null) {
        return   props.children  ;
      }
      const { imgSrc } = emoji;
      return <span style={{
        padding:0,
        backgroundImage: `url(${imgSrc})`, 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right', 
        backgroundSize: 19,
        color:'transparent',
        
      }}>{props.children}</span>;
    },


  },
  // {
  //   strategy: findImageEntities,
  //   component: Image,
  // },
]);

/**
 * 输入框
 */
class InputBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(decorator),//创建editorState
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

    
  }

  handleKeyCommand=(command, editorState)=> {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
 
  //选中图片
  onSelectImage=(e)=> {
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
        this.logState();
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
    catch (e) {
      console.log(e);
    }

  };

  //选中表情
  onSelectEmoji = (content) => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    let newContentState = null;

    // 判断是否有选中，有则替换，无则插入
    const selectionEnd = selection.getEndOffset();
    const selectionStart = selection.getStartOffset();
    if (selectionEnd === selectionStart) {
      newContentState = Modifier.insertText(contentState, selection, content);
    } else {
      newContentState = Modifier.replaceText(contentState, selection, content);
    }
    const newEditorState = EditorState.push(editorState, newContentState);
    this.onChange(newEditorState);
    setTimeout(() => {
      this.focus();
    }, 0);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }



  //绘制输入框
  renderInput() {
    return (
      <div style={styles.toolbar} >

        {renderEmojiPanel(this.onSelectEmoji)}
        <label for="uploadPhoto" data-tip="发送图片" className="label-toolbar"> <FontAwesomeIcon icon={farImage} size='lg' /></label>
        <input id="uploadPhoto" type='file' style={inputStyle} onChange={this.onSelectImage} accept="image/*" />
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


}


function mapStateToProps(state) {
  return state;
}



const page = connect(mapStateToProps, null)(InputBox);

/**
* InputBox
*/
export { page as InputBox };
