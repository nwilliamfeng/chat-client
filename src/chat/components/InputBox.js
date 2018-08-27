import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defaultEmojiMapping } from '../defaultEmojiMapping';
import { AtomicBlockUtils, Modifier, Editor, EditorState, RichUtils, convertToRaw, CompositeDecorator } from "draft-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage as farImage, faFolder as farFolder, faSmile as farSmile } from '@fortawesome/free-regular-svg-icons';
import Popup from "reactjs-popup";
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

  emojiTab: {
    padding:  0,
    marginTop: -20,
    width:442,
  },

  emojiTabPanel:{
    paddingLeft:10,
    paddingRight:10,
    paddingTop:10,
  },

  emojiTabHeader:  {
    background:'#F5F5F5',
    padding:0,
    marginRight:-10,
    marginLeft:-10,
    marginTop:10,
  },
};

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
    callback(start, start + matchArr[0].length);
  }
};


const decorator = new CompositeDecorator([
  //处理表情
  {
    strategy: (contentBlock, callback, contentState) => {
      const emojiRegex = /\[+\:[^\[\]]+\]/g; //正则判断
      findWithRegex(emojiRegex, contentBlock, callback);
    },

    component: (props) => {
      const text = props.decoratedText.trim();
      console.log('decorated text', text);
      return <span data-offset-key={props.offsetKey} style={{ color: 'red' }}>{props.children}</span>;
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

    this.onImgUrlChange = this.onImgUrlChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onPopupEmojis = this.onPopupEmojis.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }


  onPopupEmojis() {

    //  this.setState({showEmojiPanel:true});
    // const content = "😂";
    // const editorState = this.state.editorState;
    // const selection = editorState.getSelection();
    // const contentState = editorState.getCurrentContent();
    // let newContentState = null;

    // // 判断是否有选中，有则替换，无则插入
    // const selectionEnd = selection.getEndOffset();
    // const selectionStart = selection.getStartOffset();
    // if (selectionEnd === selectionStart) {
    //   newContentState = Modifier.insertText(contentState, selection, content);
    // } else {
    //   newContentState = Modifier.replaceText(contentState, selection, content);
    // }
    // const newEditorState = EditorState.push(editorState, newContentState);
    // this.onChange(newEditorState);
    // setTimeout(() => {
    //   this.focus();
    // }, 0);


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



  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  //绘制单个表情
  renderEmoji = (emojiKey, onClose) => {
    const { imgSrc,description } = defaultEmojiMapping.getEmoji(emojiKey);
    const doClick = () => {
      onClose();
      alert('add');

    }
    return (
      <button key={emojiKey} className='emoji-btn' onClick={doClick}>
        <img src={imgSrc} style={{ width: 24 }} title={description}/>
      </button>
    )
  }

  renderEmojiRow = (rowIdx,cols, onClose) => {
   
    const emojis=defaultEmojiMapping.getAllEmojis();
    let arr = [];
    for (let i = 0; i < cols; i++) {
      const emoji =emojis[cols*rowIdx+i];
      if(emoji!=null){
       const {masks} =emoji; 
       arr.push(masks);
      }
       
         
    }
    return (
      <div>
          { arr.map((item)=>this.renderEmoji(item,onClose) )}   
      </div>
   
    )
  }

  renderEmojiRows = (close) => {
    const emojis = defaultEmojiMapping.getAllEmojis();
    const cols = 15;
    const rows = Math.ceil(emojis.length / cols);
    let result = [];
    for (let i = 0; i < rows; i++) {
      result.push(
        <div >
          {this.renderEmojiRow(i,cols, close)}
        </div>

      );
    }
    return result;
  }


  // 绘制表情输入框
  renderEmojiPanel = () => {

    return (<Popup
      trigger={<label data-tip="表情" className="label-toolbar"> <FontAwesomeIcon icon={farSmile} size='lg' /></label>}
      position="center bottom"
      closeOnDocumentClick
      contentStyle={styles.emojiTab}
      arrow={false} >
      {close => (
        <div style={styles.emojiTabPanel}>
          {this.renderEmojiRows(close)}
          <div style={styles.emojiTabHeader}>
              <button className='emoji-category-btn'>默认</button>
           </div>
        </div>

      )}
    </Popup>)
  }



  //绘制输入框
  renderInput() {
    return (
      <div style={{ padding: 5 }} >

        {this.renderEmojiPanel()}
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


}


function mapStateToProps(state) {
  return state;
}



const page = connect(mapStateToProps, null)(InputBox);

/**
* InputBox
*/
export { page as InputBox };
