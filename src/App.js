import React, { Component } from 'react';
import './App.css';
import { Router, Route, BrowserRouter } from 'react-router-dom';
import { history } from './util';
import { LoginPage, LoginRoute } from './auth/components';
import { HomePage } from './home';

require('./assets/styles/react-contextmenu.css'); //这里react-contextmenu.css需要在全局里声明



class App extends Component {

  constructor(props) {
    super(props);
  }


  render() {
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
 
}




export default App;
