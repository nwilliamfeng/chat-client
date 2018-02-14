import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route, BrowserRouter } from 'react-router-dom';
import { history } from './util';
import { LoginPage, LoginRoute } from './auth/components';
import { HomePage } from './home';
 


class App extends Component {

  constructor(props) {
    super(props);

  }


  render() {
    const { alert } = this.props;
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">          
            <Router history={history}>
              <div>
                <LoginRoute exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
              </div>
            </Router>
          </div>
        </div>
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
