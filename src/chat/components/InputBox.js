import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defaultEmojiMapping } from '../defaultEmojiMapping';
import { AtomicBlockUtils, Modifier, Editor, EditorState, ContentState, RichUtils, CompositeDecorator } from "draft-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage as farImage, faFolder as farFolder, } from '@fortawesome/free-regular-svg-icons';
import ReactTooltip from 'react-tooltip';
import { renderEmojiPanel } from './EmojiTab';
import {appSettings} from '../../util';
import { fileActions } from '../actions';
require('../../assets/styles/button.css');
require('../../assets/styles/scrollbar.css');
require('../../assets/styles/input-box.css');

/**
 * 返回指定的contentBlock是否属于非文本类型
 * @param {*} block 
 */
const isAtomicBlock = (block) => block.getType() === 'atomic';


const mediaBlockRenderer = (block) => {
  if (isAtomicBlock(block)) {
    return {
      component: Media,
      editable: false,
    };
  }
  return null;
}

/**
 * 正则匹配集
 */
const regexs = {
  emoji: /\ud83d[\ude00-\ude4f]/g,//识别emoji符号
  base64Content: /data:image\/(jpeg|png|gif);base64,/g, //识别img的base64
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
      const { imgSrc } = emoji;
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
      editorState: EditorState.createEmpty(decorator),//关联Editor的state
    };

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

  /**
   * 选中图片
   */
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
        this.setState({ editorState: AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')});
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
      
    }
    catch (e) {
      console.log(e);
    }
  };

  /**
   * 点击发送图片按钮时触发
   */
  onClickSelectImage=(e)=>{
    e.target.value=null; //必须将value置空，否则无法选择相同的文件
  }

  /**
   * 使输入框获得焦点
   */
  focus = () => {
    setTimeout(() => {
      this.refs.editor.focus(); //设置完成后让输入框重新获得焦点
    }, 0);
  }

  /**
   * 返回要发送的内容
   */
  getSendContent = () => {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const blocks = contentState.getBlocksAsArray();
    return blocks.map(block => {
      if (isAtomicBlock(block)) { //如果是图片类型，则
        const entity = contentState.getEntity(block.getEntityAt(0));
        return entity.getData().src;
      }
      return block.text.replace(regexs.emoji, emojiChar => defaultEmojiMapping.getEmojiByCharacter(emojiChar).masks);
    });
  }

  /**
   * 清除输入框
   */
  clear = () => {
    const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
    this.setState({ editorState });
    this.focus();
  }

  /**
   * 采用图文分开发送
   */
  onSendWithAutoSplitMode=()=>{
    const {auth} =this.props;
    if(auth==null){
      return;
    }
    
    const {ImUserId,RefreshToken}=auth.user; //这里临时写

    this.getSendContent().filter(content=>!(content==null || content.trim()=='')).forEach(content => {
      if (regexs.base64Content.exec(content) != null) {
        console.log("image!!");
        const { dispatch } = this.props;
        dispatch(fileActions.uploadImage('myimg',content,ImUserId,RefreshToken) ); 
      }
      else {
        console.log("ddd"+content);
      }
    });
   

  }

  /**
   * 发送输入框的内容
   */
  onSend = () => {
    console.log(appSettings);
    if(appSettings.autoSplitInputContent){
      this.onSendWithAutoSplitMode();
    }
    
    this.clear();
  }

  /**
   * 选中表情
   */
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
    this.focus();
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  /**
   * 绘制输入框
   */
  renderInput = () =>{
    return (<div style={styles.toolbar} >
      {renderEmojiPanel(this.onSelectEmoji)}
      <label htmlFor="uploadPhoto" data-tip="发送图片" className="label-toolbar"> <FontAwesomeIcon icon={farImage} size='lg' /></label>
      <input id="uploadPhoto" type='file' style={styles.input} onClick={this.onClickSelectImage}   onChange={this.onSelectImage} accept="image/*"/>
      <label htmlFor="uploadFile" data-tip="发送文件" className="label-toolbar"> <FontAwesomeIcon icon={farFolder} size='lg' /></label>
      <input type='file' id="uploadFile" style={styles.input} accept=".xls,.xlsx,.doc,.docx,.txt,.pdf,.zip" />
      <ReactTooltip />
    </div>)
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
