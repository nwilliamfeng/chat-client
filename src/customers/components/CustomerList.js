import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { customerActions } from '../actions';
import { appContext } from '../../util';
import Rx from 'rx';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
// import { StaffContextMenu } from './StaffContextMenu';
import { isEqual, groupBy } from 'lodash';
import { ExpandPanel } from '../../controls';
const CUSTOMER_CONTEXTMENU_ID = 'CUSTOMER_CONTEXTMENU_ID';




const CustomerUl = styled.ul`
   list-style: none;
   width:100vh;
  `;

const GroupUl = styled(CustomerUl)``;

const AvatarSpan = styled.span`
    cursor:pointer;
    background-image:${props => {
        const url = props.AvataUrl;
        return `url(${url})`;
    }};
    background-size:  100% 100% ;
    height:24px;
    vertical-align:middle;
    width: 24px;
    border-radius:3px;
    background-repeat:no-repeat;
    background-size:cover;
    margin-right:5px;
    display:inline-block;
`;


const CustomerLi = styled.li`
    padding:5px 10px;
    outline:none;
    text-align:left;
    margin-left:${props => props.hasGroup ? '-5px' : '-45px'} ;

    &:hover{
        background-color: #DEDBDA;
    };

    color: gray;
  `;

const CustomerGroupDiv = styled.div`
    margin-left:-40px;
`;


const CustomerNameSpan = styled.span`
   
     max-width: 75px;
     width:75px;
     vertical-align:middle;
     display:inline-block;
     overflow:hidden;
     white-space:nowrap;
     text-overflow:ellipsis;
     cursor:default;
     margin-left:10px;
     margin-right:10px;
     &:hover{
         color:black;
     };
`;

const Customer = ({ value }) => {
    const { CustomerAvataUrl, CustomerName, GroupName } = value;
    return (
        <CustomerLi >
            <ContextMenuTrigger id={CUSTOMER_CONTEXTMENU_ID} attributes={{ data: JSON.stringify(value) }}>
                <AvatarSpan AvataUrl={CustomerAvataUrl} />

                <CustomerNameSpan>{CustomerName}</CustomerNameSpan>

            </ContextMenuTrigger>
        </CustomerLi>)
}

const CustomerGroup = ({ customers }) => {
    const groupName = customers[0].GroupName;
    return (
        <CustomerGroupDiv>
            {groupName &&
                <ExpandPanel title={customers[0].GroupName}>
                    {customers.map(item => <Customer key={item.StaffId} data={item} />)}
                </ExpandPanel>}
            {groupName == null &&
                <CustomerUl>
                    {customers.map(item => <Customer key={item.StaffId} data={item} />)}
                </CustomerUl>}
        </CustomerGroupDiv>
    )
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
        console.log(relationMappingList);
        return (



            <ExpandPanel title>
                <div>
                {relationMappingList &&
                    <ul>
                        {relationMappingList.map(customer => <Customer value={customer} />)}
                    </ul>}
                </div>
             
            </ExpandPanel>


        );
    }
}

const mapStateToProps = state => {
    const { relationMappingList } = state.customer;
    return { relationMappingList };
}

const page = connect(mapStateToProps, null)(CustomerList);

/**
 * CustomerList实例
 */
export { page as CustomerList };
