import React, { ReactDOM, Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { messageActions } from '../actions';
import { CustomerMessage } from './CustomerMessage';
import { StaffMessage } from './StaffMessage';
import { ContextMenu, MenuItem } from "react-contextmenu";
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

/**
 * 图片消息快捷菜单Id
 */
export const MSGLST_CONTEXTMENU_IMAGE_ID = 'MSGLST_CONTEXTMENU_IMAGE';

/**
 * 文件消息快捷菜单Id
 */
export const MSGLST_CONTEXTMENU_FILE_ID = 'MSGLST_CONTEXTMENU_FILE';

/**
 * 普通文本消息快捷菜单Id
 */
export const MSGLST_CONTEXTMENU_TEXT_MSG_ID = 'MSGLST_CONTEXTMENU_TEXT_MSG';

class MessageList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedChat: props.selectedChat, page: 0, pageCount: 0, currHeight: 0, needScroll: false };

        this.handleScrollFrame = this.handleScrollFrame.bind(this);

    }

    isSelfMessage(message) {
        return message.Sender === appContext.currentStaff.StaffId;
    }


    //处理下载文件或者图片
    handleDownloadFile(e, data, target) {
        const url = target.getAttribute('url');
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
        const { offlineMessageData } = this.props;

        if (offlineMessageData != null) {
            const { page } = this.state;
            const { currentPageIndex, totalItemCount, pageSize } = offlineMessageData;
            if (page !== currentPageIndex) {
                const pageCount = (totalItemCount / pageSize).toFixed(0);

                const { scrollbars } = this.refs;
                this.setState({ page: currentPageIndex, pageCount, needScroll: true, });
                scrollbars.scrollToBottom();

                scrollbars.scrollTop(50);
            }
        }
    }

   
    render() {
        const { offlineMessageData } = this.props;
        return (

            <Scrollbars style={{ width: '100%', height: 'calc(80vh - 80px)' }}
                ref="scrollbars"
                onScrollFrame={this.handleScrollFrame} >
                <div style={{ padding: 5 }} >
                    {offlineMessageData &&
                        <ul className="list-group">
                            {offlineMessageData.messages.map((msg) => (
                                this.isSelfMessage(msg) ?
                                    <StaffMessage key={msg.MsgId} message={msg} props={this.props} /> : <CustomerMessage key={msg.MsgId} message={msg} />
                            ))}
                        </ul>
                    }
              
                    <ContextMenu id={MSGLST_CONTEXTMENU_IMAGE_ID}>
                      
                        <MenuItem onClick={this.handleDownloadFile}>下载图片</MenuItem>
                    </ContextMenu>
                    <ContextMenu id={MSGLST_CONTEXTMENU_FILE_ID}>
                        <MenuItem onClick={this.handleDownloadFile}>下载文件</MenuItem>
                    </ContextMenu>
                    <ContextMenu id={MSGLST_CONTEXTMENU_TEXT_MSG_ID}>
                        
                    </ContextMenu>
                </div>
            </Scrollbars>


        );
    }
}

function mapStateToProps(state) {
    const { offlineMessageData } = state.offlineMessage;
    return { offlineMessageData };
}


const page = connect(mapStateToProps, null)(MessageList);

/**
 * 消息列表
 */
export { page as MessageList }; 