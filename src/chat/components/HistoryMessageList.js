import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { chatActions } from '../actions';
import {CustomerMessage} from './CustomerMessage';
import {StaffMessage} from './StaffMessage';
import {homeActions} from '../../home/actions';

 

const outContainerStyle = {
    
    height: 'calc(100% - 125px)',
    width: '100%',
    position:'absolute',
    // paddingTop: 66,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom:20,
    overflowY: 'auto',
    overflowX:'hidden',
}

class HistoryMessageList extends Component {

    constructor(props) {
        super(props);
        this.state = {  };
    }

    isSelfMessage(message){
        return message.Sender ===appContext.currentStaff.StaffId;
    }

    

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return true;
    // }

    componentWillMount(){
        const {dispatch} =this.props;
        dispatch(homeActions.queryChatWidth());
    }

    handleListSizeChanged(e){
        console.log(e);
    }

    getMessageWidth(chatWidth){
        return chatWidth/2;
    }
 
    render() {
        const { result ,chatWidth} = this.props;
        const msgWidth =this.getMessageWidth(chatWidth);
        return (
            <div style={outContainerStyle} >
                {result &&
                    <ul className="list-group" key='historyMsgList'  >
                        {result.data.map((msg) => (
                            this.isSelfMessage(msg)?
                            <StaffMessage message={msg} width={msgWidth}/> : <CustomerMessage message={msg} width={msgWidth}/> 
                           
                        ))}
                    </ul>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { result } = state.historyMessage;
    const {chatWidth} =state.home;
    return { result,chatWidth };
}


const page = connect(mapStateToProps, null)(HistoryMessageList);

/**
 * HistoryMessageList??
 */
export { page as HistoryMessageList };
