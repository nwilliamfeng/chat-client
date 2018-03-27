import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { appContext } from '../../util';
import { chatActions } from '../actions';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export const MESSAGE_CONTEXTMENU_ID = 'MESSAGE_CONTEXTMENU_ID';
require('../../assets/styles/bubble.css');


class MessageList extends Component {

    constructor(props) {
        super(props);
        this.state = { activePage: 0 };
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return true;
    // }

    render() {
        const { selectedChat } = this.props;
        return (
            <div style={{padding:10}}>
                <div className='router'>
                    <div className="rbubble">Right Bubble with align right</div>
                </div>
                <div className='louter'>
                    <div className="lbubble">Left Bubble it shoul3454424246356346235235235235426trewtweretwetr2423542354235235234twtwert342354234525twertd be on 2nd line with align left</div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}


const page = connect(mapStateToProps, null)(MessageList);

/**
 * MessageList实例
 */
export { page as MessageList };
