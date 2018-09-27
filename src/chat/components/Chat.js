import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import styled from 'styled-components';
import { messageActions } from '../../message/actions';
import { MessageList } from '../../message/components';
import { Scrollbars } from 'react-custom-scrollbars';

const TitleDiv = styled.div`
    border-bottom:1px solid #E7E7E7;
    margin-bottom:10px;
    padding:20px 0px 0px 25px;
`;

class MyScrollbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { autoHide: true };
    }

    handleMouseEnter = () => {
        this.setState({ autoHide: false });
    }

    handleMouseLeave = () => {
        this.setState({ autoHide: true });
    }

    render() {
        const { autoHide } = this.state;
        return (
            <div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <Scrollbars style={{ width: '100%', height: 'calc(80vh - 80px)' }} ref='scrollbar' autoHide={autoHide} >
                    {this.props.children}
                </Scrollbars>
            </div>)
    }
}

const WithScroll = (WrappedComponent, scrollHandle, setScollbarHandle) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = { autoHide: true };
        }

        componentDidMount() {
            // if(setScollbarHandle!=null){
            //     setScollbarHandle(this.refs.scrollbar);
            // }
        }

        handleMouseEnter = () => {
            this.setState({ autoHide: false });
        }

        handleMouseLeave = () => {
            this.setState({ autoHide: false });
        }

        scroll = offset => {
            this.refs.scrollbar.scrollTop(offset);
        }

        handleScroll = value => {
            // if(scrollHandle!=null){
            //     scrollHandle({value});
            // }
        }

        render() {
            const { autoHide } = this.state;
            return <Scrollbars style={{ width: '100%', height: 'calc(80vh - 80px)' }} ref='scrollbar' onScrollFrame={this.handleScroll} autoHide={autoHide}>
                <WrappedComponent {...this.props} />
            </Scrollbars>
        }
    }
}

const MessageContainer = ({ messages, scrollHandle, setScollbarHandle }) => {
    return WithScroll(<MessageList messages={messages} style={{ margin: 5 }} />, scrollHandle, setScollbarHandle);
}



class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = { needScrollOfflineMsgs: false, msgListHeight: 0, scrollbar: null };
    }



    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { selectedChat, messages } = this.props;

        if (!isEqual(nextProps.selectedChat, selectedChat)) {
            return true;
        }
        if (!isEqual(messages, nextProps.messages)) {
            return true;
        }

        console.log('return false');
        return false;
    }

    componentDidUpdate(nextProps, nextState, nextContext) {
        console.log('componentDidUpdate');
        const { dispatch, selectedChat, pageIdx, pageCount } = this.props;
        const { scrollbar } = this.state;
        if (selectedChat != null && !isEqual(selectedChat, nextProps.selectedChat)) {
            dispatch(messageActions.getOfflineMessages(selectedChat.customer.CustomerId, selectedChat.customer));
        }
        else if (pageIdx < pageCount) {
            if (scrollbar != null) {
                scrollbar.scrollTop(50);
            }

        }
    }

    handleScroll = value => {

        const { top } = value;

        const { selectedChat, pageIdx, pageCount } = this.props;
        if (top === 0) { //如果滚动到顶部，则触发历史消息加载      
            const { dispatch } = this.props;
            if (pageIdx < pageCount) {
                console.log('ready to get next msgs');
                dispatch(messageActions.getOfflineMessages(selectedChat.customer.CustomerId, selectedChat.customer, pageIdx + 1));
            }
        }
    }



    render() {
        console.log('render chat');
        const { selectedChat, messages } = this.props;


        return (

            <div >
                {selectedChat &&
                    <div >
                        <TitleDiv>
                            <p style={{ fontSize: 20 }}>{selectedChat.customer.CustomerName}</p>
                        </TitleDiv>
                        <MyScrollbar>
                            <MessageList messages={messages} />
                        </MyScrollbar>
                    </div>}

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { selectedChat } = state.chat;
    const { offlineMessages, pageIdx, pageCount } = state.offlineMessage;
    //todo,后面置入messages
    const messages = [...offlineMessages];

    //todo 添加消息reducer
    return { selectedChat, messages, pageIdx, pageCount };
}


const page = connect(mapStateToProps, null)(Chat);

/**
 * 聊天页
 */
export { page as Chat };




// class Chat extends Component {

//     constructor(props) {
//         super(props);
//         this.state = { needScrollOfflineMsgs: false, msgListHeight: 0, scrollTopOffset: 0, autoHide: true };
//     }



//     shouldComponentUpdate(nextProps, nextState, nextContext) {
//         const { selectedChat, messages } = this.props;
//         const { autoHide } = this.state;
//         if (autoHide !== nextState.autoHide) {
//             return true;
//         }
//         if (!isEqual(nextProps.selectedChat, selectedChat)) {
//             return true;
//         }
//         if (!isEqual(messages, nextProps.messages)) {
//             return true;
//         }

//         console.log('return false');
//         return false;
//     }


//     componentDidUpdate(nextProps, nextState, nextContext) {
//         console.log('componentDidUpdate');
//         const { dispatch, selectedChat, pageIdx, pageCount } = this.props;
//         if (selectedChat != null && !isEqual(selectedChat, nextProps.selectedChat)) {
//             dispatch(messageActions.getOfflineMessages(selectedChat.customer.CustomerId, selectedChat.customer));
//         }
//         else if (pageIdx < pageCount) {
//             this.refs.scrollbar.scrollTop(50);
//         }
//     }

//     handleScroll = value => {

//         const { top } = value;
//         const { selectedChat, pageIdx, pageCount } = this.props;
//         if (top === 0) { //如果滚动到顶部，则触发历史消息加载      
//             const { dispatch } = this.props;
//             if (pageIdx < pageCount) {
//                 console.log('ready to get next msgs');
//                 dispatch(messageActions.getOfflineMessages(selectedChat.customer.CustomerId, selectedChat.customer, pageIdx + 1));
//             }
//         }
//     }

//     handleMouseEnter = () => {
//         this.setState({ autoHide: false });
//     }

//     handleMouseLeave = () => {
//         this.setState({ autoHide: true });
//     }

//     render() {
//         console.log('render chat');
//         const { selectedChat, messages } = this.props;
//         const { autoHide } = this.state;
//         return (

//             <div >
//                 {selectedChat &&
//                     <div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
//                         <TitleDiv>
//                             <p style={{ fontSize: 20 }}>{selectedChat.customer.CustomerName}</p>
//                         </TitleDiv>
//                         <Scrollbars style={{ width: '100%', height: 'calc(80vh - 80px)' }} ref='scrollbar' onScrollFrame={this.handleScroll} autoHide={autoHide}>
//                             <MessageList messages={messages} style={{ margin: 5 }} />
//                         </Scrollbars>
//                     </div>}

//             </div>
//         );
//     }
// }