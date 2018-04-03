import React, {ReactDOM, Component } from 'react';
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

class HistoryMessageList extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {  };
        this.refScroll =React.createRef();
      
    }

    isSelfMessage(message){
        return message.Sender ===appContext.currentStaff.StaffId;
    }

     
 
    handleScroll(ev) {
        const rect =ev.currentTarget.children[0].getBoundingClientRect();
        console.log( rect );
        const ss=ev.currentTarget.getBoundingClientRect();
      //  console.log(ss  );
        console.log(ev.currentTarget  );
    }
    componentDidMount() {
        const list =this.refScroll.current;
        list.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        const list = this.refScroll.current;
        list.removeEventListener('scroll', this.handleScroll);
    }

    componentWillMount(){
        const {dispatch} =this.props;
        dispatch(homeActions.queryChatWidth());
    }

   
    getMessageWidth(chatWidth){
        return chatWidth/2;
    }
 
    render() {
        const { result ,chatWidth} = this.props;
        const msgWidth =this.getMessageWidth(chatWidth);
        return (
            <div style={outContainerStyle} ref={this.refScroll}>
                {result &&
                    <ul className="list-group"   >
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
