import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext, util } from '../../util';
import { chatActions } from '../actions';
require('../../assets/styles/bubble.css');





const containerStyle = {
    margin: 10,

    textAlign: 'right',
    float: 'right',
    display: 'block',
    clear: 'right',
}

const contentStyle = {

    textAlign: 'left',
    wordWrap: 'break-word',
}


const sendTimeStyle = {
    color: 'gray',
    fontSize: 12,
}

const senderStyle = {

    color: 'blue',
    marginLeft: 10,
    fontSize: 12,
}


export const StaffMessage = ({ message }) => {


    return (

        // <div style={containerStyle}>
        //     {/* 显示台头 */}
        //     <span style={sendTimeStyle}>{'[' + util.csharpDateFormat(message.SendTime) + ']'}<span style={senderStyle}>{message.SenderName+'：'}</span></span>

        //     <div class="router"  >
        //         <div className="rbubble"> {message.MessageContent}</div>

        //     </div>
        // </div>




        <div class="router" style={{marginLeft:400}} >
            <div style={{ textAlign: 'right' }}>
                <span style={sendTimeStyle}>{'[' + util.csharpDateFormat(message.SendTime) + ']'}<span style={senderStyle}>{message.SenderName + '：'}</span></span>
            </div>
            <div className="rbubble"> {message.MessageContent}</div>

        </div>


    )
}



