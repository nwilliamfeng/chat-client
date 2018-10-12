import React, { Component } from 'react'
import { InputBox } from './InputBox'
import styled from 'styled-components'
import sizeMe from 'react-sizeme'
import { Chat } from './Chat'
import { chatWindow } from '../../util/chatRegionHelper'

require('../../assets/styles/grid.css')
require('../../assets/styles/ul.css')

require('../../assets/styles/scrollbar.css')


const InputBoxDiv = styled.div`
    height: 22vh;
    width: 100%;
    padding: 10px;
    background: white;
    border-top-style:solid; 
    border-width: 1px;
    border-color: lightGrey;
`;

const ChatContainerDiv = styled.div`
    height:78vh;
`;

const setChat = Component => class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { width } = this.props.size;
        chatWindow.width = width;
        return (
            <div style={{ height: 'calc(100% - 61px)' }}>
                <Component {...this.props} />
            </div>
        );
    }
}

const ChatContainer = sizeMe({ monitorHeight: true })(setChat(Chat));

export class ChatPage extends Component {

    constructor(props) {
        super(props);


    }


    render() {
        return (

            <div>
                <ChatContainerDiv>
                    <ChatContainer />
                </ChatContainerDiv>
                <InputBoxDiv>
                    <InputBox />
                </InputBoxDiv>
            </div>

        );
    }
}

