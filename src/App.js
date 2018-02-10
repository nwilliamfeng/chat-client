import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Router,Route, BrowserRouter} from 'react-router-dom';
import {history} from './util';
import {Login,LoginRoute} from './login/components';
import { Home } from './home';
import Staff from './login/Staff';
 

class App extends Component {

  constructor(props){
    super(props);
    let staff={name:'fw',password:'1111'};

    let nw =new  Staff(...staff);
     
    console.log(nw);
  }

  render() {
    return (
      <div className="App">
        {/* <p>this is a main view</p>
        <Login></Login> */}
        <Router history={history} >
          <div>
            <LoginRoute exact path="/" component={Home} />
            <Route path="/login" component={Login} />
        
          </div>
        </Router>
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
