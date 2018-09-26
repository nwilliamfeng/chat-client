import React from 'react';
import { appContext } from '../../util';
import PropTypes from 'prop-types';
import { CustomerMessage } from './CustomerMessage';
import { StaffMessage } from './StaffMessage';
import { ContextMenu, MenuItem } from "react-contextmenu";
import { Scrollbars } from 'react-custom-scrollbars';

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

//处理下载文件或者图片
const handleDownloadFile = (e, data, target) => {
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

const isSelfMessage = message => {
    return message.Sender === appContext.currentStaff.StaffId;
}


export const MessageList = ({messages,scrollHandle}) => {
    const handleScrollFrame=value=>{
        if(scrollHandle!=null){
            scrollHandle(value);
        }
    }
    return (
        <Scrollbars style={{ width: '100%', height: 'calc(80vh - 80px)' }}
           
            onScrollFrame={handleScrollFrame} >
            <div style={{ padding: 5 }} >
                {messages &&
                    <ul className="list-group">
                        {messages.map(msg => (
                            isSelfMessage(msg) ?
                                <StaffMessage key={msg.MsgId} message={msg} props={this.props} /> : <CustomerMessage key={msg.MsgId} message={msg} />
                        ))}
                    </ul>
                }

                <ContextMenu id={MSGLST_CONTEXTMENU_IMAGE_ID}>

                    <MenuItem onClick={handleDownloadFile}>下载图片</MenuItem>
                </ContextMenu>
                <ContextMenu id={MSGLST_CONTEXTMENU_FILE_ID}>
                    <MenuItem onClick={handleDownloadFile}>下载文件</MenuItem>
                </ContextMenu>
                <ContextMenu id={MSGLST_CONTEXTMENU_TEXT_MSG_ID}>

                </ContextMenu>
            </div>
        </Scrollbars>)

}

MessageList.propTypes={
    messages:PropTypes.array.isRequired,
    scrollHandle:PropTypes.func,
}

// class MessageList2 extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = { selectedChat: props.selectedChat, page: 0, pageCount: 0, currHeight: 0, needScroll: false };

//     }

//     handleScrollFrame = value => {
//         if (scrollHandle != null) {
//             scrollHandle(value);
//         }
//         // const { scrollHeight, top } = value;
//         // if (top === 0) { //如果滚动到顶部，则触发历史消息加载      
//         //     const { selectedChat, page, pageCount } = this.state;

//         //     const { dispatch } = this.props;
//         //     if (page < pageCount) {
//         //         dispatch(messageActions.getRecentMessages(selectedChat.customer.CustomerId, page + 1));
//         //     }
//         // }
//         // else {
//         //     const { needScroll, currHeight } = this.state;
//         //     if (currHeight !== scrollHeight) {
//         //         this.setState({ currHeight: scrollHeight });
//         //     }
//         //     if (needScroll === true) {
//         //         const { scrollbars } = this.refs;

//         //         scrollbars.scrollTop(scrollHeight - currHeight);
//         //         this.setState({ needScroll: false });
//         //     }
//         // }
//     }

//     // componentDidUpdate(prevProps, prevState) {
//     //     const { offlineMessageData } = this.props;

//     //     if (offlineMessageData != null) {
//     //         const { page } = this.state;
//     //         const { currentPageIndex, totalItemCount, pageSize } = offlineMessageData;
//     //         if (page !== currentPageIndex) {
//     //             const pageCount = (totalItemCount / pageSize).toFixed(0);

//     //             const { scrollbars } = this.refs;
//     //             this.setState({ page: currentPageIndex, pageCount, needScroll: true, });
//     //             scrollbars.scrollToBottom();

//     //             scrollbars.scrollTop(50);
//     //         }
//     //     }
//     // }


//     render() {
//         return (

//             <Scrollbars style={{ width: '100%', height: 'calc(80vh - 80px)' }}
//                 ref="scrollbars"
//                 onScrollFrame={this.handleScrollFrame} >
//                 <div style={{ padding: 5 }} >
//                     {messages &&
//                         <ul className="list-group">
//                             {messages.map((msg) => (
//                                 this.isSelfMessage(msg) ?
//                                     <StaffMessage key={msg.MsgId} message={msg} props={this.props} /> : <CustomerMessage key={msg.MsgId} message={msg} />
//                             ))}
//                         </ul>
//                     }

//                     <ContextMenu id={MSGLST_CONTEXTMENU_IMAGE_ID}>

//                         <MenuItem onClick={this.handleDownloadFile}>下载图片</MenuItem>
//                     </ContextMenu>
//                     <ContextMenu id={MSGLST_CONTEXTMENU_FILE_ID}>
//                         <MenuItem onClick={this.handleDownloadFile}>下载文件</MenuItem>
//                     </ContextMenu>
//                     <ContextMenu id={MSGLST_CONTEXTMENU_TEXT_MSG_ID}>

//                     </ContextMenu>
//                 </div>
//             </Scrollbars>


//         );
//     }
// }




