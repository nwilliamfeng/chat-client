import React, { ReactDOM, Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { messageActions } from '../actions';
import { CustomerMessage } from './CustomerMessage';
import { StaffMessage } from './StaffMessage';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { Scrollbars } from 'react-custom-scrollbars';
 

// const outContainerStyle = {

//     height: 'calc(100%)',
//     width: 'calc(100% )',
//     position: 'absolute',
//     paddingLeft: 5,
//     paddingRight: 5,
//     paddingBottom: 20,

//      overflowY: 'auto',
//        overflowX: 'hidden',
// }

export const MSGLST_CONTEXTMENU_DOWNLOAD_ID = 'MSGLST_CONTEXTMENU_DOWNLOAD';

class MessageList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedChat: props.selectedChat, page: 0, pageCount: 0, currHeight: 0, needScroll: false };
        this.handleScrollFrame = this.handleScrollFrame.bind(this);
        this.handleDownloadFile = this.handleDownloadFile.bind(this);
    }

    isSelfMessage(message) {
        return message.Sender === appContext.currentStaff.StaffId;
    }

    //处理下载文件或者图片
    handleDownloadFile(e, data, target) {
        let url = target.getAttribute('url');
        if (url != null) {
            try {
                window.open(url);
            }
            catch (e) {
                console.log(e);
            }
        }

    }

    handleScrollFrame(value) {
        const { scrollHeight, top } = value;
        if (top === 0) { //如果滚动到顶部，则触发历史消息加载      
            const { selectedChat, page, pageCount } = this.state;

            const { dispatch } = this.props;
            if (page < pageCount) {
                dispatch(messageActions.getRecentMessages(selectedChat.customer.CustomerId, page + 1));
            }
        }
        else {
            const { needScroll, currHeight } = this.state;
            if (currHeight !== scrollHeight) {
                this.setState({ currHeight: scrollHeight });
            }
            if (needScroll === true) {
                const { scrollbars } = this.refs;

                scrollbars.scrollTop(scrollHeight - currHeight);
                this.setState({ needScroll: false });
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { recentResult } = this.props;

        if (recentResult != null) {
            const { page } = this.state;
            const { currentPageIndex, totalItemCount, pageSize } = recentResult;
            if (page !== currentPageIndex) {
                const pageCount = (totalItemCount / pageSize).toFixed(0);

                const { scrollbars } = this.refs;
                this.setState({ page: currentPageIndex, pageCount, needScroll: true, });
                scrollbars.scrollToBottom();

                scrollbars.scrollTop(50);
            }
        }
    }

    renderMessages() {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        return (
            <div >
                {arr.map((x) => (
                    <p>{'asdfasfaf' + x}</p>
                ))}
            </div>
        )
    }

    render() {
        const { recentResult } = this.props;
        return (
            <Scrollbars style={{ width: '100%', height: 'calc(80vh - 80px)' }}
                ref="scrollbars"
                onScrollFrame={this.handleScrollFrame} >
                <div style={{ padding: 5 }} >
                    {recentResult &&
                        <ul className="list-group">
                            {recentResult.messages.map((msg) => (
                                this.isSelfMessage(msg) ?
                                    <StaffMessage key={msg.MsgId} message={msg} props={this.props} /> : <CustomerMessage key={msg.MsgId} message={msg} />
                            ))}
                        </ul>
                    }
                    {this.renderMessages()}

                    <ContextMenu id={MSGLST_CONTEXTMENU_DOWNLOAD_ID}>
                        <MenuItem onClick={this.handleDownloadFile}>下载图片</MenuItem>
                    </ContextMenu>
                </div>
            </Scrollbars>

        );
    }
}

function mapStateToProps(state) {
    const { recentResult } = state.historyMessage;
    return { recentResult };
}


const page = connect(mapStateToProps, null)(MessageList);

/**
 * MessageList??
 */
export { page as MessageList }; 