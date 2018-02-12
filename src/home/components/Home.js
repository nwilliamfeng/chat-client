import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../auth/actions';



class Home extends Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }



    handleLogout() {   
        const { dispatch } = this.props;
        dispatch(authActions.logout());
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
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    Java <b className="caret"></b>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">jmeter</a></li>
                                    <li><a href="#">EJB</a></li>
                                    <li><a href="#">Jasper Report</a></li>
                                    <li className="divider"></li>
                                    <li><a href="#">分离的链接</a></li>
                                    <li className="divider"></li>
                                    <li><a href="#">另一个分离的链接</a></li>
                                </ul>
                            </li>
                            <li><a href="#" ><span class="glyphicon glyphicon-user"></span> 注册</a></li>
                            <li><a href="#" onClick={this.handleLogout}><span class="glyphicon glyphicon-log-in"></span> 退出</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}


function mapStateToProps(state) {

    // const {loggingIn,user} =state.auth;
    // return {
    //   loggingIn :loggingIn,
    //   user:user,

    // };
    return {};
}


const homePage = connect(mapStateToProps)(Home);
export { homePage as Home }; 