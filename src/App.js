import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from 'react-modal';
import  {CustomerList}  from './customers/views/customer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>this is a main view</p>
        <CustomerList/>
      </div>
    );
  }
}

 

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       modalIsOpen: false
//     };

//     this.openModal = this.openModal.bind(this);
//     this.afterOpenModal = this.afterOpenModal.bind(this);
//     this.closeModal = this.closeModal.bind(this);
//   }

//   openModal() {
//     this.setState({ modalIsOpen: true });
//   }

//   afterOpenModal() {
    
//     this.subtitle.style.color = '#f00';
//   }

//   closeModal() {
//     this.setState({ modalIsOpen: false });
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={this.openModal}>Open Modal</button>
//         <Modal
//           isOpen={this.state.modalIsOpen}
//           onAfterOpen={this.afterOpenModal}
//           onRequestClose={this.closeModal}
//           style={customStyles}
//           contentLabel="Example Modal"
//         >
//           <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>         
//           <div>I am a modal</div>
//           <form>
//             <input />
//             <button>tab navigation</button>
//             <button>the modal</button>
//           </form>
//           <button onClick={this.closeModal}>close</button>
//         </Modal>
//         <div>
//           <p>this is main view</p>
//         </div>
//       </div>
//     )
//   }
// }

export default App;
