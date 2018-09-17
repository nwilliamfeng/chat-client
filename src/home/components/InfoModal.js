import React from 'react';
import Modal from 'react-modal';


const customStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
  }
};

/**
 * 对话框
 */
export const InfoModal =({message,isOpen,closeHandle})=>{

    const doclose=()=>closeHandle();
    return (
        <Modal
        isOpen={isOpen}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={doclose}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <h2>Hello</h2>
        <button onClick={doclose}>close</button>
        <div>{message}</div>
       
      </Modal>
    )
}