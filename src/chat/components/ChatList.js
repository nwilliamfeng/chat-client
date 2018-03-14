import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChatList extends Component {

    render() {
        return (
            <div>
                this is chatsview
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}


const page = connect(mapStateToProps, null)(ChatList);

/**
 * ChatList实例
 */
export { page as ChatList };
