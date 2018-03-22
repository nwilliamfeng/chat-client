import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { chatActions } from '../actions';
import {HistoryMessage} from './HistoryMessage'
 

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
            <div>
                {result &&
                    <ul className="list-group">
                        {result.data.map((msg) => (
                            <HistoryMessage message={msg}/>
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
