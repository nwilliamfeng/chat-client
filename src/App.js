import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route, BrowserRouter } from 'react-router-dom';
import { history } from './util';
import { Login, LoginRoute } from './auth/components';
import { Home } from './home';
import Staff from './auth/Staff';


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
            {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Router history={history}>
              <div>
                <LoginRoute exact path="/" component={Home} />
                <Route path="/login" component={Login} />

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
