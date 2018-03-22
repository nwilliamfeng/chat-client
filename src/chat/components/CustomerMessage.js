import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext,util } from '../../util';
import { chatActions } from '../actions';




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


const staffMessageStyle ={
    textAlign:'right',
}

const staffMessageBodyStyle = {
    padding: 5,
    background: 'green',
    textAlign: 'right',
}

 

 

const isSelfMessage=(message)=>{
    return message.Sender  ===appContext.currentStaff.StaffId;
}

const getContainerStyle =(message)=>{
    return {
        textAlign:isSelfMessage(message)? 'right':'left',
    }
}

const getSendTimeStyle =(message)=>{
    return {
        color: isSelfMessage(message)?'gray':'red',  
    }
}

const getSenderStyle =(message)=>{
    return {
        color: isSelfMessage(message)?'blue':'gray',  
        marginLeft:10,
    }
}
 

export const HistoryMessage = ({ message}) => {

     
    return (
        <div style={getContainerStyle(message)}>
            {/* 显示台头 */}
           <span style={getSendTimeStyle(message)}>{'['+util.csharpDateFormat( message.SendTime)+']'}<span style={getSenderStyle(message)}>{message.SenderName}</span></span>  
        </div>
    )
}

 

