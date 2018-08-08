import React from "react";
import { AtomicBlockUtils, Editor, EditorState, RichUtils, convertToRaw, } from "draft-js";


export default class UnimplementPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),   
    };

    this.focus = () =>  {
      this.refs.editor.focus();
    }

    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
    };
    
    this.onChange = (editorState) =>{
      this.setState({ editorState }); //在编辑器内容被更改后重新重新设置状态
    }
     
    this.onImgUrlChange = this.onImgUrlChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  onImgUrlChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    try {
      
      reader.readAsDataURL(file);//读取文件选择器的base64内容
      reader.onload = () => {
        const { editorState} = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity( 'IMAGE', 'IMMUTABLE', { src: reader.result } );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set( editorState, { currentContent: contentStateWithEntity } );
        this.setState({ editorState: AtomicBlockUtils.insertAtomicBlock( newEditorState, entityKey,' ')});    
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
      <div  >
        <input type='file' onChange={this.onImgUrlChange} accept="image/*" />
        <input type='file'   accept="file/.zip" />
       
      </div>
    )
  }

  render() {
    return (
      <div style={styles.root}>
        {this.renderInput()}
      
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            blockRendererFn={mediaBlockRenderer}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder="输入内容..."
            ref="editor"
          />
        </div>
        <input
          onClick={this.logState}
          style={styles.button}
          type="button"
          value="Log State"
        />
      </div>
    );
  }
}

const mediaBlockRenderer = (block) => {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
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
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
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










