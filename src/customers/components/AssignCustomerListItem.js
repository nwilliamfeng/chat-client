import React  from 'react';
import { util } from '../../util';
import CustomerHelper from '../customerHelper'
import { ContextMenuTrigger } from "react-contextmenu";
import { CUSTOMER_CONTEXTMENU_ID } from './AssignCustomerList';


const tdStyle = {
    height: 24,
    cursor:'default',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 3,
    paddingBottom: 0,
}

/**
 * 在表行里添加列
 * @param {customer} customer 
 */
const appendTds = (customer) => {
    const attributes = {
        customer: JSON.stringify(customer), //注意此处value不能传json类型，否则从attributes无法获取？2018-2-27
        className: 'react-contextmenu-customers',
    }
    const cols = [];
    const add = (name) => {
        cols.push(
            <td key={customer.CustomerId+"_"+name} style={tdStyle}>
                <ContextMenuTrigger id={CUSTOMER_CONTEXTMENU_ID} attributes={attributes}>
                    {name}
                </ContextMenuTrigger>
            </td>);
    }
    cols.push(add(customer.Device));
    cols.push(add(CustomerHelper.getStateInfo(customer.CustomerState)));
    cols.push(add(customer.ProductName));
    cols.push(add(customer.StaffName));
    cols.push(add(customer.CustomerId));
    cols.push(add(customer.Uid));
    cols.push(add(customer.CustomerName));
    cols.push(add(customer.CustomerIp ));
    cols.push(add( customer.CustomerIpMappingAddress ));
    cols.push(add(util.dateFormat(customer.EnterTime, 'hh:mm:ss')));
    return cols;
}

export const AssignCustomerListItem = ({ customer ,openChat}) => {

    const onDoubleClick = () => {
        openChat(customer);
    }
    return (
        <tr onDoubleClick={onDoubleClick}>
            {appendTds(customer)}
        </tr>
    )
}
