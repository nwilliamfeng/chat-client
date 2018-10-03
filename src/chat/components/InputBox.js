import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defaultEmojiMapping } from '../../util/defaultEmojiMapping';
import { AtomicBlockUtils, Modifier, Editor, EditorState, ContentState, CompositeDecorator } from "draft-js";
import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
import { appSettings,appContext } from '../../util';
import {chatActions, fileActions } from '../actions';
import { Toolbar } from './Toolbar';
require('../../assets/styles/button.css');
require('../../assets/styles/scrollbar.css');
require('../../assets/styles/input-box.css');

/**
 * 返回指定的contentBlock是否属于非文本类型
 * @param {*} block 
 */
const isAtomicBlock = block => block.getType() === 'atomic';

const mediaBlockRenderer = block => isAtomicBlock(block) ? { component: Media, editable: false } : null;

/**
 * 按键命令集合
 */
const keyCommands = {
  SEND: 'editor-send',
}

/**
 * 正则匹配集
 */
const regexs = {
  emoji: /\ud83d[\ude00-\ude4f]/g,//识别emoji符号
  base64Content: /data:image\/(jpeg|png|gif);base64,/g, //识别img的base64
}

const Media = props => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  return <img src={src} style={styles.img} />;
};

//样式集
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
  img: {
    maxWidth: 120,
    minWidth: 16,
    whiteSpace: 'initial',
  },
};

//获取表情样式
const emojiStyle = imgSrc => {
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
    this.onChange = editorState => this.setState({ editorState }); //在编辑器内容被更改后重新重新设置状态
  }

  editorKeyBindingFn = e => {
    const { hasCommandModifier } = KeyBindingUtil;
    if (e.keyCode === 13 && hasCommandModifier(e)) {
      return keyCommands.SEND;//ctrl+enter 发送
    }
    return getDefaultKeyBinding(e);
  }

  /**
   * 处理按键
   */
  handleKeyCommand = command => {
    switch (command) {
      case keyCommands.SEND:
        this.onSend();
        break;
      default:
        break;
    }
  }

  /**
   * 选中图片
   */
  onSelectImage = e => {
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
  onSendWithAutoSplitMode = () => {
    if (appContext.currentStaff==null){
      return;
    }
    const { dispatch,selectedChat } = this.props;
    if(selectedChat==null){
      return;
    }
    const {channelId} =selectedChat;
    const { ImUserId, RefreshToken } = appContext.currentStaff; //这里临时写
    

    this.getSendContent().filter(content => !(content == null || content.trim() == '')).forEach(content => {
      if (regexs.base64Content.exec(content) != null) {
        console.log("image!!");
        
        dispatch(fileActions.uploadImage('myimg', content, ImUserId, RefreshToken));
      }
      else {
        dispatch(chatActions.sendMessage(channelId,content));
      }
    });
  }

  /**
   * 发送输入框的内容
   */
  onSend = () => {
    if (appSettings.autoSplitInputContent) {
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

  render() {
    return (
      <div>
        <Toolbar onSelectEmoji={this.onSelectEmoji} onSelectImage={this.onSelectImage} />
        <div className='scollContainer editor-container' >
          <div style={styles.editor} onClick={this.focus} style={styles.editor} >
            <Editor
              blockRendererFn={mediaBlockRenderer}
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.editorKeyBindingFn}
              onChange={this.onChange}
              ref="editor"
            />
          </div>
        </div>
        <div style={{ paddingRight: 10, paddingBottom: 10, paddingTop: 10 }}>

          <button className='send-msg-btn pull-right' onClick={this.onSend}>{'发送'}</button>

        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  const { selectedChat } = state.chat;
  return { selectedChat }
};

const page = connect(mapStateToProps, null)(InputBox);

export { page as InputBox };
