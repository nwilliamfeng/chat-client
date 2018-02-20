import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../actions';


/**
 * 客服菜单项
 */
class StaffMenu extends Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);

    }


    

    handleLogout() {
        const { dispatch } = this.props;
        dispatch(authActions.logout());
    }

    /*
     https://fontawesome.com/v4.7.0/icon/refresh/
    */

    render() {
        if (this.props.user == null) {
            return (<li className="dropdown"></li>);
        }
        else {
            const { StaffName } = this.props.user;
           
            return (
                <li className="dropdown" >
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <span className="glyphicon glyphicon-user"></span>  {StaffName}<b className="caret"></b>
                    </a>
                    <ul className="dropdown-menu" >


                        <li className="menu-item dropdown dropdown-submenu left-submenu">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">更改状态</a>
                            <ul className="dropdown-menu">
                                <li> <a href="#">在线</a></li>
                                <li> <a href="#">离开</a></li>
                                <li> <a href="#">转接</a></li>
                            </ul>
                        </li>
                        <li className="divider"></li>
                        <li><a href="#">设置</a></li>
                        <li className="divider"></li>
                        <li><a href="#" onClick={this.handleLogout}><span className="glyphicon glyphicon-log-in"></span> 退出</a></li>
                    </ul>
                </li>
            );
        }
    }
}


function mapStateToProps(state) {
    return state.auth;
}


const page = connect(mapStateToProps)(StaffMenu);
export { page as StaffMenu }; 