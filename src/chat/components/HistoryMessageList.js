import React, { ReactDOM, Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { messageActions } from '../actions';
import { CustomerMessage } from './CustomerMessage';
import { StaffMessage } from './StaffMessage';
import { homeActions } from '../../home/actions';



const outContainerStyle = {

    height: 'calc(100% - 125px)',
    width: '100%',
    position: 'absolute',
    // paddingTop: 66,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    overflowY: 'auto',
    overflowX: 'hidden',
}

class HistoryMessageList extends React.Component {

    constructor(props) {
        super(props);

        this.state = { selectedChat: props.selectedChat, currPageIdx: -1 };
        this.refScroll = React.createRef();
        this.handleScroll=this.handleScroll.bind(this);
    }

    isSelfMessage(message) {
        return message.Sender === appContext.currentStaff.StaffId;
    }



    handleScroll(ev) {
        const ulRect = ev.currentTarget.children[0].getBoundingClientRect();
        const parentDivRect = ev.currentTarget.getBoundingClientRect();
        if (ulRect.top === parentDivRect.top) { //如果滚动到顶部，则触发历史消息加载
            console.log('raise');
            console.log(this.state);
            const {selectedChat, currPageIdx } = this.state;
            const {}=this.props;
            messageActions.getRecentMessages(selectedChat.customer.CustomerId,currPageIdx+1 );
        }


    }

    componentDidMount() {
        this.refScroll.current.addEventListener('scroll', this.handleScroll); //注册滚动事件


    }

    componentWillUnmount() {
        this.refScroll.current.removeEventListener('scroll', this.handleScroll); //取消滚动事件
    }

    componentDidUpdate(prevProps, prevState) {
        const { recentResult } = this.props;

        if (recentResult != null) {
            const { currPageIdx } = this.state;
            if (currPageIdx !== recentResult.currentPageIndex) {
                this.setState({ currPageIdx: recentResult.currentPageIndex });
            }
        }
    }

    componentWillMount() {

        //  dispatch(homeActions.queryChatWidth());
    }


    getMessageWidth(chatWidth) {
        return chatWidth / 2;
    }

    render() {
        const { recentResult, chatWidth } = this.props;
        const msgWidth = this.getMessageWidth(chatWidth);
        return (
            <div style={outContainerStyle} ref={this.refScroll}>
                {recentResult &&
                    <ul className="list-group">
                        {recentResult.messages.map((msg) => (
                            this.isSelfMessage(msg) ?
                                <StaffMessage key={msg.MsgId} message={msg} width={msgWidth} /> : <CustomerMessage key={msg.MsgId} message={msg} width={msgWidth} />

                        ))}
                    </ul>
                }
            </div>
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
