import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../actions';


/**
 * 客服菜单项
 */
class StaffMenu extends Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this); //
        this.changeStaffState =this.handleLogout.bind(this); //添加客服状态
        
    }

    handleLogout() {
        const { dispatch } = this.props;
        dispatch(authActions.logout());
    }

    changeStaffState(state){
        const { dispatch } = this.props;
        dispatch(authActions.changeStaffState(state));
    }

    shouldComponentUpdate(nextProps, nextState, nextContext){
        const {user} =nextProps; //如果返回的user为空则不做渲染
        const result =user!=null;
        return result;
    }

    render() {       
            const staffName = this.props.user?this.props.user.StaffName :'';          
            return (
                <li className="dropdown" >
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <span className="glyphicon glyphicon-user"></span>  {staffName}<b className="caret"></b>
                    </a>
                    <ul className="dropdown-menu">
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


function mapStateToProps(state) {
    return state.auth;
}


const page = connect(mapStateToProps)(StaffMenu);
export { page as StaffMenu }; 