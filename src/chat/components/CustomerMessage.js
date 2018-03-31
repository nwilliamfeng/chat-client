import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext, util } from '../../util';
import { chatActions } from '../actions';
import { renderMessageContent } from './messageContentRender';
require('../../assets/styles/bubble.css');



const imgMsgSample = {
    ChannelID: 5356283611374137403,
    MsgId: 5174262130321659459,
    Content: {
        "Extension": "zxkf_001",
        "Content": "{Url:http://61.129.129.189:7480/ZrhdWZaXSB/a12abba937274dd5ab71bad4f929136clogo2.png,FileName:logo2.png,ThumbUrl:http://61.129.129.189:7480/ZrhdWZaXSB/a12abba937274dd5ab71bad4f929136clogo2.png,UrlEnd:UrlEnd}"
    }
}

const txtMsgSample = {
    ChannelID: 3002,
    MsgId: 5085252487365133580,
    Content: { "Extension": "zxkf_001", "Content": "abc", "SenderID": "3002", "ID": "9f6c2d09-4095-4968-b572-1700fc53f745", "SenderName": "???", "ChannelID": "5356283611374137403" }
}

const historyMsgSample =
    {
        ChannelId: null,
        MessageContent: "345",
        MsgId: "4709406645084376307",
        QuestionId: null,
        SendTime: "/Date(1521641788097)/",
        Sender: "19014FB9C306EE40",
        SenderID: null,
        SenderName: "匿名",
        Type: 1,
    }





const sendTimeStyle = {
    color: 'gray',
    fontSize: 12,
    marginLeft: 10,
}

const senderStyle = {
    fontSize: 12,
    color: 'gray',
}

const contentStyle = (width) => ({
    wordWrap: 'break-word',
    maxWidth: width ? width : window.innerWidth / 2,
})


export const CustomerMessage = ({ message, width }) => {
    const { MessageContent } = message;
    return (
        <div class="louter"  >
            <div style={{ display: 'table-cell', paddingRight: 15, }}>
                <img style={{ width: 42, height: 42, marginTop: 30 }} src={require('../../assets/imgs/customer.jpg')} />
            </div>
            <div style={{ display: 'table-cell', }}>
                <div>
                    <span style={senderStyle}>{message.SenderName}<span style={sendTimeStyle}>{'[' + util.csharpDateFormat(message.SendTime) + ']'}</span></span>
                </div>
                <div className="lbubble" style={contentStyle(width)}>
                    {renderMessageContent(MessageContent,width)}
                </div>
            </div>
        </div>
    )
}



