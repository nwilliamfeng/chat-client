import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { customerActions } from '../actions';
import { appContext } from '../../util';
import Rx from 'rx';
import { isEqual } from 'lodash';


const CustomerLi=styled.li`
    padding:2px;
`;

const Customer = ({value}) => {
    const { CustomerAvataUrl,CustomerName } = value;
    return (
    <CustomerLi>
        <span style={{ backgroundImage: `url${CustomerAvataUrl}` }} />
        <span>{CustomerName}</span>
    </CustomerLi>)
}

class CustomerList extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !isEqual(this.props.relationMappingList, nextProps.relationMappingList);
    }


    componentDidMount() {
        if (appContext.currentStaff != null) {
            this.subscribeRelationMappingList();
        }
    }

    componentWillUnmount() {
        this.subscription.dispose();
    }

    subscribeRelationMappingList = () => {
        const source = Rx.Observable
            .interval(5000 /* ms */)
            .timeInterval();
        this.subscription = source.subscribe(
            () => {
                if (appContext.currentStaff != null) {
                    const { dispatch } = this.props;
                    dispatch(customerActions.fetchCustomerRelationMappingList());
                }
                else {
                    this.subscription.dispose();
                }
            },
            (err) => {
                console.log('Error: ' + err);
            },
            () => {
                console.log('Completed');
            });
    }


    render() {
        console.log('do render customerlist');
        const { relationMappingList } = this.props;
        return (



            <div>
                {relationMappingList &&
                    <ul>
                        {relationMappingList.map(customer=> <Customer value={customer}/>)}
                    </ul>}
            </div>


        );
    }
}

const mapStateToProps = state => {
    const { relationMappingList } = state.customer;
    return {relationMappingList};
}

const page = connect(mapStateToProps, null)(CustomerList);

/**
 * CustomerList实例
 */
export { page as CustomerList };
