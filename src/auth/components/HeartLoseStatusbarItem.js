import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../actions';


const HeartLoseStatusbarItem = ({ reconnectCount }) => {
    const msg = reconnectCount ? reconnectCount >= 10 ? '尝试与服务器重连次数超过10次，重连失败，请退出并重新登录。' : '尝试与服务器进行第' + reconnectCount + '次重连失败。' : '';
    return (
        <li><a href="#" >{msg}</a></li>
    )
}

function mapStateToProps(state) {
    return state.auth;
 
} 


const page = connect(mapStateToProps)(HeartLoseStatusbarItem);
  export { page as HeartLoseStatusbarItem };

/**
 * 心跳丢失信息项
 */
// class HeartLoseStatusbarItem extends Component {

//     constructor(props) {
//         super(props);
//         this.handleLogout = this.handleLogout.bind(this);

//     }


//     componentDidUpdate() {
//         const { errorCount } = this.props;
//         if(errorCount>0){
//             alert(errorCount);
//         }

//     }

//     handleLogout() {
//         const { dispatch } = this.props;
//         dispatch(authActions.logout());
//     }

//     /*
//      https://fontawesome.com/v4.7.0/icon/refresh/
//     */

//     render() {
//         if (this.props.user == null) {
//             return (<li className="dropdown"></li>);
//         }
//         else {
//             const { StaffName } = this.props.user;

//             return (
//                 <li className="dropdown" >
//                     <a href="#" className="dropdown-toggle" data-toggle="dropdown">
//                         <span className="glyphicon glyphicon-user"></span>  {StaffName}<b className="caret"></b>
//                     </a>
//                     <ul className="dropdown-menu" >


//                         <li className="menu-item dropdown dropdown-submenu left-submenu">
//                             <a href="#" className="dropdown-toggle" data-toggle="dropdown">更改状态</a>
//                             <ul className="dropdown-menu">
//                                 <li> <a href="#">在线</a></li>
//                                 <li> <a href="#">离开</a></li>
//                                 <li> <a href="#">转接</a></li>
//                             </ul>
//                         </li>
//                         <li className="divider"></li>
//                         <li><a href="#">设置</a></li>
//                         <li className="divider"></li>
//                         <li><a href="#" onClick={this.handleLogout}><span className="glyphicon glyphicon-log-in"></span> 退出</a></li>
//                     </ul>
//                 </li>
//             );
//         }
//     }
// }


// function mapStateToProps(state) {

//     console.log(state);
//     return state.auth;


// }


// const page = connect(mapStateToProps)(StaffMenu);
// export { page as StaffMenu }; 