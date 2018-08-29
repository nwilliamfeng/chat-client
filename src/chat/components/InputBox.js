import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defaultEmojiMapping } from '../defaultEmojiMapping';
import { AtomicBlockUtils, Modifier, Editor, EditorState, RichUtils, CompositeDecorator } from "draft-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage as farImage, faFolder as farFolder, } from '@fortawesome/free-regular-svg-icons';
import ReactTooltip from 'react-tooltip';
import { renderEmojiPanel } from './EmojiTab';
require('../../assets/styles/button.css');
require('../../assets/styles/scrollbar.css');
require('../../assets/styles/input-box.css');

//返回指定的contentBlock是否属于非文本类型
const isAtomicBlock=(block)=>{
   return block.getType() === 'atomic';
}

const mediaBlockRenderer = (block) => {
  if (isAtomicBlock(block)) {
    return {
      component: Media,
      editable: false,
    };
  }
  return null;
}

//正则匹配集
const regexs={
  emoji:/\ud83d[\ude00-\ude4f]/g,
}


const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  return <img src={src} style={styles.img} />;
};

//样式集
const styles = {
  input: {
    display: 'none',
  },

  buttons: {
    marginBottom: 10,
  },

  toolbar: {
    padding: 5,
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

//获取表情样式
const emojiStyle = (imgSrc) => {
  return {
    padding: 0,
    backgroundImage: `url(${imgSrc})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    backgroundSize: 19,
    color: 'transparent',
  }
}

const findWithRegex = (regex, contentBlock, callback) => {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
     callback(start, start + matchArr[0].length);
  }
};

const decorator = new CompositeDecorator([
  {  //处理表情
    strategy: (contentBlock, callback, contentState) => {
      findWithRegex(regexs.emoji, contentBlock, callback);
    },

    component: (props) => {
      const character = props.decoratedText;
      const emoji = defaultEmojiMapping.getEmojiByCharacter(character);
      if (emoji == null) { //如果没有找到对应表情则直接返回
        return props.children;
      }
      const {imgSrc} = emoji;
      return <span style={emojiStyle(imgSrc)}>{props.children}</span>;//注意必须与return同行写
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
      this.refs.editor.focus(); //获得焦点
    }

    this.onChange = (editorState) => {
      this.setState({ editorState }); //在编辑器内容被更改后重新重新设置状态
    }

  }

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  //选中图片
  onSelectImage = (e) => {
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

  //发送消息
  onSend = () => {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const blocks = contentState.getBlocksAsArray();
    console.log(blocks);
    let value =blocks[0].text;
    let dd= value.replace(regexs.emoji,(x)=>{
      const {masks}= defaultEmojiMapping.getEmojiByCharacter(x); 
      return masks;
    });


  //  console.log(dd);
  }

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
      this.focus(); //设置完成后让输入框重新获得焦点
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
        <label htmlFor="uploadPhoto" data-tip="发送图片" className="label-toolbar"> <FontAwesomeIcon icon={farImage} size='lg' /></label>
        <input id="uploadPhoto" type='file' style={styles.input} onChange={this.onSelectImage} accept="image/*" />
        <label htmlFor="uploadFile" data-tip="发送文件" className="label-toolbar"> <FontAwesomeIcon icon={farFolder} size='lg' /></label>
        <input type='file' id="uploadFile" style={styles.input} accept=".xls,.xlsx,.doc,.docx,.txt,.pdf,.zip" />
        <ReactTooltip />
      </div>
    )}

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
        <button className='send-msg-btn' onClick={this.onSend}>{'发送'}</button>
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
