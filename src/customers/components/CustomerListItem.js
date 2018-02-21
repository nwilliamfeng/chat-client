import React, { PropTypes } from 'react';

export const CustomerListItem = ({ Device, CustomerState, ProductName, StaffName, CustomerId
    , Uid, CustomerName, CustomerIp, CustomerIpMappingAddress, EnterTime, onDoubleClick }) => {
    return (
        <tr>
            <td>{Device}</td>
            <td>{State}</td>
            <td>{ProductName}</td>
            <td>{CustomerId}</td>
            <td>{Uid}</td>
            <td>{CustomerName}</td>
            <td>{CustomerIp}({CustomerIpMappingAddress})</td>
            <td>{EnterTime}</td>
        </tr>
    )
}
