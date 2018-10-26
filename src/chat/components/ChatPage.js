import React, { Component } from 'react'
import { InputBox } from './InputBox'
import styled from 'styled-components'
import sizeMe from 'react-sizeme'
import { Chat } from './Chat'


const InputBoxDiv = styled.div`
    height: 22vh;
    width: 100%;
    padding: 3px 25px;
    background: white;
    border-top-style:solid; 
    border-width: 1px;
    border-color: lightGrey;
`;

const ChatContainerDiv = styled.div`
    height:78vh;
    padding:0px 3px;
`;

const setChat = Component => props =>
    <div style={{ height: 'calc(100% - 61px)' }}>
        <Component {...props} />
    </div>

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

