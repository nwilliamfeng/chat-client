import React, { ReactDOM, Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { messageActions } from '../actions';
import { CustomerMessage } from './CustomerMessage';
import { StaffMessage } from './StaffMessage';
import { homeActions } from '../../home/actions';
import { Scrollbars } from 'react-custom-scrollbars';


const outContainerStyle = {

    // height: 'calc(100% - 125px)',
    // width: '100%',
    // position: 'absolute',
    // paddingTop: 66,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    //   overflowY: 'auto',
    //   overflowX: 'hidden',
}

class HistoryMessageList extends React.Component {

    constructor(props) {
        super(props);

        this.state = { selectedChat: props.selectedChat, page: 0, pageCount: 0, currHeight: 0, needScroll: false };

        this.handleScrollFrame = this.handleScrollFrame.bind(this);
    }

    isSelfMessage(message) {
        return message.Sender === appContext.currentStaff.StaffId;
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
                console.log(scrollHeight - currHeight);
                this.setState({ needScroll: false });
            }
        }


    }

    componentDidMount() {
        //   this.refScroll.current.addEventListener('scroll', this.handleScroll); //注册滚动事件


    }


    componentWillUnmount() {
        //   this.refScroll.current.removeEventListener('scroll', this.handleScroll); //取消滚动事件
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

                // scrollbars.scrollTop(50);
            }
        }
    }

    componentWillMount() {

        //  dispatch(homeActions.queryChatWidth());
    }

    renderMessages(){
        const arr =[1,2,3,4,5,6,7,8,9];
        return (
            <div>
                {arr.map((x)=>(
                  <p>{'asdfasfaf'+x}</p>
                ))}
                </div>
        )
    }

    getMessageWidth(chatWidth) {
        return chatWidth / 2;
    }
 
    render() {
        const { recentResult, chatWidth } = this.props;
        const msgWidth = this.getMessageWidth(chatWidth);
        return (
            <Scrollbars style={{ width: 'calc(100% - 10px)', height: 'calc(100% - 130px)', position: 'absolute', }}
                ref="scrollbars"
                onScrollFrame={this.handleScrollFrame} >
                <div style={outContainerStyle} >
                    {recentResult &&
                        <ul className="list-group">
                            {recentResult.messages.map((msg) => (
                                this.isSelfMessage(msg) ?
                                    <StaffMessage key={msg.MsgId} message={msg} width={msgWidth} /> : <CustomerMessage key={msg.MsgId} message={msg} width={msgWidth} />
                            ))}
                        </ul>
                    }
                </div>
                
                {this.renderMessages( )}
              
            </Scrollbars>
        );
    }
}

function mapStateToProps(state) {
    const { recentResult } = state.historyMessage;
    const { chatWidth } = state.home;
    return { recentResult, chatWidth };
}


const page = connect(mapStateToProps, null)(HistoryMessageList);

/**
 * HistoryMessageList??
 */
export { page as HistoryMessageList };
