import React, { PropTypes } from 'react';
import { util } from '../../util';
import CustomerHelper from '../customerHelper'
import { ContextMenuTrigger } from "react-contextmenu";
import {CUSTOMER_CONTEXTMENU_ID} from './CustomerList';


const tdStyle = {
    height: 24,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 3,
    paddingBottom: 0,
}

/**
 * 在表行里添加列
 * @param {customer} customer 
 */
const appendTds=(customer)=>{
    const attributes = {
        customer:JSON.stringify(customer), //注意此处value不能传json类型，否则从attributes无法获取？2018-2-27
        className: 'react-contextmenu-customers',
    }
    const rows =[];
    const add= (name)=>{
        rows.push(<td style={tdStyle}><ContextMenuTrigger id={CUSTOMER_CONTEXTMENU_ID} attributes={attributes}>{name}</ContextMenuTrigger></td>);
    }     
    rows.push(add(customer.Device));
    rows.push(add(CustomerHelper.getStateInfo(customer.CustomerState)));
    rows.push(add(customer.ProductName));
    rows.push(add(customer.StaffName));
    rows.push(add(customer.CustomerId));
    rows.push(add(customer.Uid));
    rows.push(add(customer.CustomerName));
    rows.push(add(customer.CustomerIp+'('+customer.CustomerIpMappingAddress+')'));
    rows.push(add(util.dateFormat(customer.EnterTime, 'hh:mm:ss')));
    return rows;
}



export const CustomerListItem = ({ customer,onOpenChat }) => {   
      
    const onDoubleClick=(customer)=>{
        alert(customer.Device);
    }
    return (
        <tr onDoubleClick={onOpenChat}>
           { appendTds(customer)}        
        </tr>
    )
}
