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

