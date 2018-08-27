import React, { Component } from 'react';
import sizeMe from 'react-sizeme';
import { Chat } from './Chat';
import {chatWindow} from '../chatRegionHelper'

class ChatContainer extends Component {

    constructor(props) {
        super(props);
      
     
    }


    

    render() {
        const { width } = this.props.size;
        chatWindow.width=width;
        return (
            <div style={{ height: 'calc(100% - 80px)' }}>
                <Chat />
            </div>


        );
    }
}

export default sizeMe({ monitorHeight: true })(ChatContainer);