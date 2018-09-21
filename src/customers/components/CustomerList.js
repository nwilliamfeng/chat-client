import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { customerActions } from '../actions';
import {chatActions} from '../../chat/actions';
import { appContext } from '../../util';
import Rx from 'rx';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { isEqual, groupBy } from 'lodash';
import { ExpandPanel } from '../../controls';
const CUSTOMER_CONTEXTMENU_ID = 'CUSTOMER_CONTEXTMENU_ID';


const CustomerContextMenu = ({ dispatch }) => {
    const handleOpenChatClick = (e, data, target) => {
        const customer = JSON.parse(target.getAttribute('customerdata'));
        //alert(customer.CustomerName);
        dispatch(chatActions.chatWithMyCustomer(customer));
    }
    return (
        <ContextMenu id={CUSTOMER_CONTEXTMENU_ID}>
            <MenuItem onClick={handleOpenChatClick}>发起聊天</MenuItem>
        </ContextMenu>)
}

const CustomerUl = styled.ul`
   list-style: none;
   width:100vh;
  `;

const AvatarSpan = styled.span`

    background-image:${props => {
        const url = props.AvataUrl;
        return `url(${url})`;
    }};
    background-size:  100% 100% ;
    height:24px;
    vertical-align:middle;
    width: 24px;
    border-radius:2px;
    background-repeat:no-repeat;
    background-size:cover;
    margin-right:5px;
    display:inline-block;
`;


const CustomerLi = styled.li`
    padding:5px 10px;
    outline:none;
    text-align:left;
    /* margin-left:${props => props.hasGroup ? '-5px' : '-45px'} ; */

    &:hover{
        background-color: #DEDBDA;
    };

    color: gray;
  `;

const DepartmentDiv = styled.div`
    margin-left:-35px;
`;

const CategoryDiv = styled.div`
    margin-left:-40px;
`;



const CustomerNameSpan = styled.span`
     max-width: 75px;
     width:75px;
     color:black;
     vertical-align:middle;
     display:inline-block;
     overflow:hidden;
     white-space:nowrap;
     text-overflow:ellipsis;
     cursor:default;
     margin-left:10px;
     margin-right:10px;
    
`;

/**
 * 客户项
 * @param {*} param0 
 */
const Customer = ({ data }) => {
    const { CustomerAvataUrl, CustomerName } = data;
    return (
        <CustomerLi title={CustomerName}>
            <ContextMenuTrigger id={CUSTOMER_CONTEXTMENU_ID} attributes={{ customerdata: JSON.stringify(data) }}>
                <AvatarSpan AvataUrl={CustomerAvataUrl} />
                <CustomerNameSpan >{CustomerName}</CustomerNameSpan>
            </ContextMenuTrigger>
        </CustomerLi>)
}

/**
 * 部门
 * @param {*} param0 
 */
const Department = ({ customers }) => {
    const department = customers[0].DepartmentName;
    return (
        <DepartmentDiv>
            {department &&
                <ExpandPanel title={customers[0].GroupName} count={customers.length}>
                    {customers.map(item => <Customer key={item.StaffId} data={item} />)}
                </ExpandPanel>}
            {department == null &&
                <CustomerUl>
                    {customers.map(item => <Customer key={item.StaffId} data={item} />)}
                </CustomerUl>}
        </DepartmentDiv>
    )
}



/**
 * 我的客户
 * @param {*} param0 
 */
const MyCustomers = ({ customers }) => {

    return (

        <ExpandPanel title={'我的客户'} count={customers.length}>
            {customers.map(customer => <Customer key={customer.CustomerId} data={customer} />)}
        </ExpandPanel>

    )
}

/**
 * 产品大类
 * @param {*} param0 
 */
const Category = ({ customers }) => {
    const productName = customers[0].ProductName;
    const departments = Object.values(groupBy(customers, 'DepartmentName'));
    return (
        <CategoryDiv key={productName}>
            <ExpandPanel title={productName} count={customers.length}>
                <MyCustomers customers={customers} />
                {departments && !departments.some(x => x.some(y => y.DepartmentName == null)) && departments.map(department => <Department key={department[0].DepartmentName} customers={department} />)}
            </ExpandPanel>
        </CategoryDiv>
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
            this.loadCustomers();
            this.subscribeRelationMappingList();
        }
    }

    loadCustomers = () => {
        if (appContext.currentStaff != null) {
            const { dispatch } = this.props;
            dispatch(customerActions.fetchCustomerRelationMappingList());
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
                this.loadCustomers();
                if (appContext.currentStaff == null) {
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
        const { relationMappingList, dispatch } = this.props;
        const categories = relationMappingList ? Object.values(groupBy(relationMappingList, 'ProductName')) : [];

        return (
            <div>
                {categories && <ul> {categories.map(category => <Category customers={category} key={category[0].ProductName} />)} </ul>}
                <CustomerContextMenu dispatch={dispatch} contextMenuId={CUSTOMER_CONTEXTMENU_ID} />
            </div>)
    };
}



const mapStateToProps = state => {
    const { relationMappingList } = state.customer;
    return { relationMappingList };
}

const page = connect(mapStateToProps, null)(CustomerList);

/**
 * 客户列表
 */
export { page as CustomerList };
