import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route, BrowserRouter } from 'react-router-dom';
import { history } from './util';
import { LoginPage, LoginRoute } from './auth/components';
import { HomePage } from './home';
require('./assets/styles/react-contextmenu.css');
 

class App extends Component {

  constructor(props) {
    super(props);

  }


  render() {
    const { alert } = this.props;
    return (
      
        <div className="container">
                
            <Router history={history}>
              <div>
                <LoginRoute exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
              </div>
            </Router>
          
        </div>
     
    );
  }

  // render() {
  //   return (
  //     <div className="App">

  //       <Router history={history} >
  //         <div>
  //           <LoginRoute exact path="/" component={Home} />
  //           <Route path="/login" component={Login} />

  //         </div>
  //       </Router>
  //     </div>
  //   );
  // }


}




export default App;
