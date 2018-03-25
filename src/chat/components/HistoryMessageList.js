import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { chatActions } from '../actions';
import {CustomerMessage} from './CustomerMessage';
import {StaffMessage} from './StaffMessage';

const outContainerStyle = {
    background: '#f8f8f8',
   
    height: 'calc(100% - 125px)',
    width: '100%',
    position:'absolute',
    // paddingTop: 66,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom:20,
    
    //  paddingBottom: 10,
    overflowY: 'auto',
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
 
    render() {
        const { result } = this.props;
        return (
            <div style={outContainerStyle} >
                {result &&
                    <ul className="list-group">
                        {result.data.map((msg) => (
                            this.isSelfMessage(msg)?
                            <StaffMessage message={msg}/> :<CustomerMessage message={msg}/>
                        ))}
                    </ul>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { result } = state.historyMessage;
    return { result };
}


const page = connect(mapStateToProps, null)(HistoryMessageList);

/**
 * HistoryMessageList??
 */
export { page as HistoryMessageList };
