import React, { Component } from 'react';
import { connect } from 'react-redux';

class CustomerList extends Component {

    constructor(props) {
        super(props);
    }
 
    renderItems(){
        let result =[];
        for(let i=0;i<200;i++){
            result.push(<div>{'abc'+i}</div>);
        }
        return result;
    }
  

    render() {
        console.log('do render chatlist');
        return (

            

                <div  >
                   {this.renderItems()}
                </div>
            

        );
    }
}

function mapStateToProps(state) {
    const { chats, selectedChat } = state.chat;

    return {
        chats,
        selectedChat,


    }
}



const page = connect(mapStateToProps, null)(CustomerList);

/**
 * CustomerList实例
 */
export { page as CustomerList };
