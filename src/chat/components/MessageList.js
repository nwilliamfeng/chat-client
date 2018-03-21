import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { appContext } from '../../util';
import { chatActions } from '../actions';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export const MESSAGE_CONTEXTMENU_ID = 'MESSAGE_CONTEXTMENU_ID';



class MessageList extends Component {

    constructor(props) {
        super(props);
        this.state = { activePage: 0 };
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;

    }
 

    render() {
        const { selectedChat } = this.props;
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


const page = connect(mapStateToProps, null)(MessageList);

/**
 * MessageList实例
 */
export { page as MessageList };
