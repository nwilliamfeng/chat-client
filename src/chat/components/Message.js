import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { appContext } from '../../util';
import { chatActions } from '../actions';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export const MESSAGE_CONTEXTMENU_ID = 'MESSAGE_CONTEXTMENU_ID';

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

//????
const channelMessage = {
    ChannelID,
    Content,
    ContentType, //number
    MsgID,
    MsgIndexID,//long
    SendDateTime, //number
    Sender: { Nick, UserID },
    SenderID,
}

const staffMessageStyle = {
    padding: 5,
    background: 'green',

}

class Message extends Component {

    constructor(props) {
        super(props);
        //this.state={};
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;

    }


    render() {
        
        return (
            <div>
            
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { selectedChat } = state.chat;
    return { selectedChat };
}


const page = connect(mapStateToProps, null)(Message);

/**
 * Message ??
 */
export { page as Message };
