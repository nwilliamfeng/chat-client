import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { customerActions } from '../actions'
import { chatActions } from '../../chat/actions'
import { appContext } from '../../util'
import Rx from 'rx'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import { isEqual, groupBy } from 'lodash'
import { ExpandPanel,withLoading } from '../../controls'

const CUSTOMER_CONTEXTMENU_ID = 'CUSTOMER_CONTEXTMENU_ID'
 

const CustomerContextMenu = ({ dispatch }) => {
    const handleOpenChatClick = (e, data, target) => {
        const customer = JSON.parse(target.getAttribute('customerdata'))
        dispatch(chatActions.chatWithMyCustomer(customer))
    }
    return <ContextMenu id={CUSTOMER_CONTEXTMENU_ID}>
        <MenuItem onClick={handleOpenChatClick}>发起聊天</MenuItem>
    </ContextMenu>
}

const CustomerUl = styled.ul`
   list-style: none;
   width:100%;`

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
    display:inline-block;`

const CustomerLi = styled.li`
    padding:5px 10px;
    outline:none;
    text-align:left;
    padding-left:15px;
    &:hover{
        background-color: #DEDBDA;
    };
    color: gray;`

const DepartmentDiv = styled.div`margin-left:-35px;`

const CategoryDiv = styled.div`margin-left:-40px;`

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
     margin-right:10px;`

/**
 * 客户项
 * @param {*} param0 
 */
const Customer = ({ data,dispatch }) => {
    const { CustomerAvataUrl, CustomerName } = data
    const handleDoubleClick=()=>dispatch(chatActions.chatWithMyCustomer(data))
    return <ContextMenuTrigger id={CUSTOMER_CONTEXTMENU_ID} attributes={{ customerdata: JSON.stringify(data) }}>
        <CustomerLi title={CustomerName} onDoubleClick={handleDoubleClick}>
            <AvatarSpan AvataUrl={CustomerAvataUrl} />
            <CustomerNameSpan >{CustomerName}</CustomerNameSpan>
        </CustomerLi>
    </ContextMenuTrigger>
}

/**
 * 部门
 * @param {*} param0 
 */
const Department = ({ customers ,dispatch}) => {
    const department = customers[0].DepartmentName
    return <DepartmentDiv>
        {department && <ExpandPanel title={customers[0].GroupName} count={customers.length}>
            {customers.map(item => <Customer key={item.StaffId} data={item} />)}
        </ExpandPanel>}
        {department == null && <CustomerUl>
            {customers.map(item => <Customer key={item.StaffId} data={item} dispatch={dispatch}/>)}
        </CustomerUl>}
    </DepartmentDiv>
}

/**
 * 我的客户
 * @param {*} param0 
 */
const MyCustomers = ({ customers, expandHandle, checkExpandHandle,dispatch }) => {
    const productName = customers[0].ProductName
    const myCustomersKey = 'myCustomers_' + productName
    const isExpand = checkExpandHandle ? checkExpandHandle(myCustomersKey) : false
    return <ExpandPanel title={'我的客户'} count={customers.length} isChild={true} isExpand={isExpand} expandHandle={expandHandle} panelId={myCustomersKey}>
        {customers.map(customer => <Customer key={customer.CustomerId} data={customer} dispatch={dispatch}/>)}
    </ExpandPanel>
}

/**
 * 产品大类
 * @param {*} param0 
 */
const Category = ({ customers, expandHandle, checkExpandHandle,dispatch }) => {
    const productName = customers[0].ProductName
    const productKey = 'category_' + productName
    const isExpand = checkExpandHandle ? checkExpandHandle(productKey) : false
    const departments = Object.values(groupBy(customers, 'DepartmentName'))
    return <CategoryDiv key={productName} >
        <ExpandPanel title={productName} count={customers.length} isExpand={isExpand} expandHandle={expandHandle} panelId={productKey}>
            <MyCustomers customers={customers} checkExpandHandle={checkExpandHandle} expandHandle={expandHandle} dispatch={dispatch}/>
            {departments && !departments.some(x => x.some(y => y.DepartmentName == null))
                 && departments.map(department => <Department key={department[0].DepartmentName} customers={department} dispatch={dispatch} />)}
        </ExpandPanel>
    </CategoryDiv>
}

const LoadingDiv=styled.div`padding:5px 10px;color:gray;`

const Loading=withLoading(LoadingDiv,'客户列表');

class CustomerList extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !isEqual(this.props.relationMappingList, nextProps.relationMappingList)
    }

   

    getExpandState = panelId => {
        const { expandStates } = this.props
        const state = expandStates.find(x => x.panelId === panelId)
        return state == null ? false : state.isExpand
    }

    handleExpandState = (panelId, isExpand) => {
        const { dispatch } = this.props
        dispatch(customerActions.changeExpandState(panelId, isExpand))
    }

    render() {
        const { relationMappingList, dispatch } = this.props;
        const categories = relationMappingList ? Object.values(groupBy(relationMappingList, 'ProductName')) : []
        return <div>
            {categories.length===0 && <Loading/>}
            {categories.length>0 &&
                <ul>
                    {categories.map(category => <Category customers={category} key={category[0].ProductName} dispatch={dispatch}  expandHandle={this.handleExpandState} checkExpandHandle={this.getExpandState} />)}
                </ul>}
            <CustomerContextMenu dispatch={dispatch} contextMenuId={CUSTOMER_CONTEXTMENU_ID} />
        </div>
    }
}

const mapStateToProps = state => {
    const { relationMappingList, expandStates } = state.customer
    return { relationMappingList, expandStates }
}

const page = connect(mapStateToProps, null)(CustomerList)

/**
 * 客户列表
 */
export { page as CustomerList }
