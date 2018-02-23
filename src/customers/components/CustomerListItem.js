import React, { PropTypes } from 'react';
import {util} from '../../util';
import CustomerHelper from  '../customerHelper'

export const CustomerListItem = ({customer,onOpenChat}) => {
    return (
        <tr onDoubleClick={onOpenChat}>
            <td>{customer.Device}</td>
            <td>{CustomerHelper.getStateInfo( customer.CustomerState)}</td>
            <td>{customer.ProductName}</td>
            <td>{customer.StaffName}</td>
            <td>{customer.CustomerId}</td>
            <td>{customer.Uid}</td>
            <td>{customer.CustomerName}</td>
            <td>{customer.CustomerIp}({customer.CustomerIpMappingAddress})</td>
            <td>{util.dateFormat( customer.EnterTime,'hh:mm:ss')}</td>
        </tr>
    )
}
