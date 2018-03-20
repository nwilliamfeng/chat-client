import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../actions';
import { staffStateValues } from '../constants/staffStates'
import AuthHelper from '../authHelper';

/**
 * 客服菜单项
 */
class StaffMenu extends Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this); //
        this.changeStaffState = this.changeStaffState.bind(this); //添加客服状态

    }

    handleLogout() {
        const { dispatch } = this.props;
        dispatch(authActions.logout());
    }

    changeStaffState(e) {
        const { key } = e._targetInst;
        const { dispatch } = this.props;
        dispatch(authActions.changeStaffState(Number.parseInt(key)));
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { user } = nextProps; //如果返回的user为空则不做渲染
        const result = user != null;
        return result;
    }

    getChangeStateStyle(key) {
        const state = this.props.user ? this.props.user.StaffState : 0;
        if (key === state) {
            return {
                fontWeight: 'bold',
            }
        }
        return {
            fontWeight: 'normal',
        }
    }

    render() {
        const staffName = this.props.user ? this.props.user.StaffName : '';
        const stateStr = this.props.user ? '(' + AuthHelper.getStaffStateString(this.props.user.StaffState) + ')' : '';

        return (
            <li className="dropdown" >
                <a className="dropdown-toggle" data-toggle="dropdown">
                    <span className="glyphicon glyphicon-user"></span>  {staffName}{stateStr}<b className="caret"></b>
                </a>
                <ul className="dropdown-menu">
                    <li className="menu-item dropdown dropdown-submenu left-submenu">
                        <a className="dropdown-toggle" data-toggle="dropdown">更改状态</a>
                        <ul className="dropdown-menu">
                            <li> <a style={this.getChangeStateStyle(staffStateValues.ONLINE)} key={staffStateValues.ONLINE} onClick={this.changeStaffState}>在线</a></li>
                            <li> <a style={this.getChangeStateStyle(staffStateValues.LEAVE)} key={staffStateValues.LEAVE} onClick={this.changeStaffState}>离开</a></li>
                            <li> <a style={this.getChangeStateStyle(staffStateValues.TRANSFER)} key={staffStateValues.TRANSFER} onClick={this.changeStaffState}>转接</a></li>
                        </ul>
                    </li>
                    <li className="divider"></li>
                    <li><a  >设置</a></li>
                    <li className="divider"></li>
                    <li><a onClick={this.handleLogout}> 退出</a></li>
                </ul>
            </li>
        );
    }
}


function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
    //return state.auth;
}


const page = connect(mapStateToProps)(StaffMenu);
export { page as StaffMenu }; 