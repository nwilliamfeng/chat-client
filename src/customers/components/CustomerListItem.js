import React, { PropTypes } from 'react';
import { util } from '../../util';
import CustomerHelper from '../customerHelper'
import { ContextMenuTrigger } from "react-contextmenu";
import {CUSTOMER_CONTEXTMENU_ID} from './CustomerList';

export const CustomerListItem = ({ customer, onOpenChat }) => {
    const tdStyle = {
        height: 24,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 3,
        paddingBottom: 0,
    }

    const attributes = {
        customer:JSON.stringify(customer), //注意此处key必须是string
        className: 'react-contextmenu-customers',
    }

    return (
        <tr onDoubleClick={onOpenChat}>
            <td style={tdStyle}>
                <ContextMenuTrigger id={CUSTOMER_CONTEXTMENU_ID} attributes={attributes}>
                    {customer.Device}
                </ContextMenuTrigger>
            </td>
            <td style={tdStyle}>
                <ContextMenuTrigger id={CUSTOMER_CONTEXTMENU_ID} attributes={attributes}>
                    {CustomerHelper.getStateInfo(customer.CustomerState)}
                </ContextMenuTrigger>
            </td>
            <td style={tdStyle}>
                <ContextMenuTrigger id={CUSTOMER_CONTEXTMENU_ID} attributes={attributes}>
                    {customer.ProductName}
                </ContextMenuTrigger>
            </td>
            <td style={tdStyle}>
                <ContextMenuTrigger id={CUSTOMER_CONTEXTMENU_ID} attributes={attributes}>
                    {customer.StaffName}
                </ContextMenuTrigger>
            </td>
            <td style={tdStyle}>
                <ContextMenuTrigger id={CUSTOMER_CONTEXTMENU_ID} attributes={attributes}>
                    {customer.CustomerId}
                </ContextMenuTrigger>
            </td>
            <td style={tdStyle}>
                <ContextMenuTrigger id={CUSTOMER_CONTEXTMENU_ID} attributes={attributes}>
                    {customer.Uid}
                </ContextMenuTrigger>
            </td>
            <td style={tdStyle}>
                <ContextMenuTrigger id={CUSTOMER_CONTEXTMENU_ID} attributes={attributes}>
                    {customer.CustomerName}
                </ContextMenuTrigger>
            </td>
            <td style={tdStyle}>
                <ContextMenuTrigger id={CUSTOMER_CONTEXTMENU_ID} attributes={attributes}>
                    {customer.CustomerIp}({customer.CustomerIpMappingAddress})
                </ContextMenuTrigger>
            </td>
            <td style={tdStyle}>
                <ContextMenuTrigger id={CUSTOMER_CONTEXTMENU_ID} attributes={attributes}>
                    {util.dateFormat(customer.EnterTime, 'hh:mm:ss')}
                </ContextMenuTrigger>
            </td>

        </tr>
    )
}
