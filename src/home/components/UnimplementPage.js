import React from "react";
import { AtomicBlockUtils, Editor, EditorState, RichUtils, convertToRaw, } from "draft-js";


export default class UnimplementPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      url: '',
      urlType: 'image',
    };

    this.focus = () => this.refs.editor.focus();
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
    };
    this.onChange = (editorState) => this.setState({ editorState });
    
    this.onFileUrlChange = this.onFileUrlChange.bind(this);
    
    this.handleKeyCommand = this._handleKeyCommand.bind(this);

  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  confirmMedia(e) {
    e.preventDefault();
    const { editorState, urlValue, urlType } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      urlType,
      'IMMUTABLE',
      { src: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity }
    );

    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        ' '
      ),

      urlValue: '',
    });
  }



  onFileUrlChange(e) {

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({ urlValue: reader.result });
      const { editorState, urlValue, urlType } = this.state;
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        urlType,
        'IMMUTABLE',
        { src: urlValue }
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(
        editorState,
        { currentContent: contentStateWithEntity }
      );

      this.setState({
        editorState: AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          ' '
        ),

        urlValue: '',
      });
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };

  };





  renderInput = () => {
    return (
      <div style={styles.urlInputContainer}>
      
        <input type='file' onChange={this.onFileUrlChange} accept="image/gif, image/jpeg" />
       
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

const mediaBlockRenderer=(block)=> {
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
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: '\'Georgia\', serif',
    marginRight: 10,
    padding: 3,
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
    maxWidth: 150,
    minWidth:16,
    whiteSpace: 'initial'
  },
};










