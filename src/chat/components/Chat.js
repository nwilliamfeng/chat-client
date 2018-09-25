import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { messageActions } from '../../message/actions';
import { MessageList } from '../../message/components';

const TitleDiv=styled.div`
    border-bottom:1px solid #E7E7E7;
    margin-bottom:10px;
    padding:20px 0px 0px 25px;
`;

class Chat extends Component {

    constructor(props) {
        super(props);

    }
    

    componentDidUpdate(nextProps, nextState, nextContext) {
        const { dispatch, selectedChat } = this.props;
        if (selectedChat != null) {
            dispatch(messageActions.getRecentMessages(selectedChat.customer.CustomerId));
        }
    }

    render() {
        const { selectedChat } = this.props;
        return (

            <div >
                {selectedChat &&
                    <div  >
                        <TitleDiv>
                            <p style={{ fontSize: 20 }}>{selectedChat.customer.CustomerName}</p>
                        </TitleDiv>

                        <MessageList selectedChat={selectedChat} />
                    </div>}

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { selectedChat } = state.chat;
    return { selectedChat };
}


const page = connect(mapStateToProps, null)(Chat);

/**
 * 聊天页
 */
export { page as Chat };
