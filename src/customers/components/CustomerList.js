import React, { Component } from 'react';
import { connect } from 'react-redux';
import {customerActions} from  '../actions';

class CustomerList extends Component {

    constructor(props) {
        super(props);
      console.log('sdf');
    }

    renderItems() {
        let result = [];
        for (let i = 0; i < 200; i++) {
            result.push(<div>{'abc' + i}</div>);
        }
        return result;
    }


    componentDidMount(){
        console.log('dddd');
        customerActions.initize();
    }


    render() {
        console.log('do render customerlist');
        return (



            <div  >
                {this.renderItems()}
            </div>


        );
    }
}

function mapStateToProps(state) {
   
    return state.customer;
      
}



const page = connect(mapStateToProps, null)(CustomerList);

/**
 * CustomerList实例
 */
export { page as CustomerList };
