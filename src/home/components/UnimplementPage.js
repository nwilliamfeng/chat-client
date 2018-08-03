import React from "react";
import {  AtomicBlockUtils, Editor,EditorState,RichUtils,convertToRaw, } from "draft-js";
 

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
      this.onChange = (editorState) => this.setState({editorState});
      this.onURLChange = (e) => this.setState({urlValue: e.target.value});
       this.onFileUrlChange=(e)=>{
        
         const file= e.target.files[0];
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onload = ()=> {
           console.log(reader.result);
           
         };
         reader.onerror =  (error)=> {
           console.log('Error: ', error);
         };
       };
      this.confirmMedia = this.confirmMedia.bind(this);
      this.handleKeyCommand = this._handleKeyCommand.bind(this);
      this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this);
     
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
      const {editorState, urlValue, urlType} = this.state;
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        urlType,
        'IMMUTABLE',
        {src: urlValue}
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(
        editorState,
        {currentContent: contentStateWithEntity}
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

    _onURLInputKeyDown(e) {
      if (e.which === 13) {
        this._confirmMedia(e);
      }
    }
 

    renderInput=()=>{
        return(
            <div style={styles.urlInputContainer}>
            <input
              onChange={this.onURLChange}
              ref="url"
              style={styles.urlInput}
              type="text"
              value={this.state.urlValue}
              onKeyDown={this.onURLInputKeyDown}
            />
            <input type='file' onChange={this.onFileUrlChange} accept="image/gif, image/jpeg"/>
            <button onMouseDown={this.confirmMedia}>
              Confirm
            </button>
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

  function mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
      return {
        component: Media,
        editable: false,
      };
    }

    return null;
  }

  const Audio = (props) => {
    return <audio controls src={props.src} style={styles.media} />;
  };

  const Image = (props) => {
    return <img src={props.src} style={styles.media} />;
  };

  const Video = (props) => {
    return <video controls src={props.src} style={styles.media} />;
  };

  const Media = (props) => {
    const entity = props.contentState.getEntity(
      props.block.getEntityAt(0)
    );
    const {src} = entity.getData();
    const type = entity.getType();

    let media;
    if (type === 'audio') {
      media = <Audio src={src} />;
    } else if (type === 'image') {
      media = <Image src={src} />;
    } else if (type === 'video') {
      media = <Video src={src} />;
    }

    return media;
  };

  const styles = {
    root: {
      fontFamily: '\'Georgia\', serif',
      padding: 20,
      width: 600,
    },
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
      width: '100%',
      // Fix an issue with Firefox rendering video controls
      // with 'pre-wrap' white-space
      whiteSpace: 'initial'
    },
  };
 
 
 
  
 
  

 

 
