import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';




export class Home extends Component {

    constructor(props) {
        super(props);
        this.clearUserInfo = this.clearUserInfo.bind(this);
    }

    clearUserInfo() {
        localStorage.removeItem("user");
    }



    render() {

        return (
            <div className="container-fluid">
                <nav className="navbar navbar-default navbar-fixed-top" >
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">IM在线客服</a>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#"><span class="glyphicon glyphicon-user"></span> 注册</a></li>
                            <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> 登录</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}


// function mapStateToProps(state) {

//     const {loggingIn,user} =state.auth;
//     return {
//       loggingIn :loggingIn,
//       user:user,

//     };
// }

// export default connect(mapStateToProps,null)(Login);
////const connectedLoginPage = connect(mapStateToProps)(Login);
//export { connectedLoginPage as Login }; 