import React, { Component } from 'react';
import { connect } from 'react-redux';
import {appContext} from '../../util';
import { customerActions } from '../actions';
import {CustomerListItem} from './CustomerListItem';

class CustomerList extends Component {

    constructor(props) {    
        super(props);
   
       
    }

    componentWillMount(){
        if(appContext.currentStaff!=null){
            const {dispatch} =this.props;
            dispatch(customerActions.fetchCustomerList);
        }
    }

    // shouldComponentUpdate(nextProps, nextState,nextContext) {
       
    //     return false;
    // }


    render() {
        const {customers} = this.props;
       
        return (
            <div  >
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th >来源</th>
                            <th >状态</th>
                            <th >业务来源</th>
                            <th >客服姓名</th>
                            <th >客户ID</th>
                            <th >三方ID</th>
                            <th >姓名</th>
                            <th >IP地址(位置)</th>
                            <th >进入时刻</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                              customers.map((item) => (
                                <CustomerListItem
                                  key={item.UserID}
                                  customer={item}
                            
                                //   onToggle={() => onToggleTodo(item.id)}
                                //   onRemove={() => onRemoveTodo(item.id)}
                                />
                                ))
                        }
                    </tbody>

                </table>
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
