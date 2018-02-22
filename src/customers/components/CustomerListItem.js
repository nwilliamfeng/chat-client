import React, { PropTypes } from 'react';

export const CustomerListItem = ({customer}) => {
    return (
        <tr>
            <td>{customer.Device}</td>
            <td>{customer.CustomerState}</td>
            <td>{customer.ProductName}</td>
            <td>{customer.StaffName}</td>
            <td>{customer.CustomerId}</td>
            <td>{customer.Uid}</td>
            <td>{customer.CustomerName}</td>
            <td>{customer.CustomerIp}({customer.CustomerIpMappingAddress})</td>
            <td>{customer.EnterTime}</td>
        </tr>
    )
}


// export const CustomerListItem = ({ Device, CustomerState, ProductName, StaffName, CustomerId
//     , Uid, CustomerName, CustomerIp, CustomerIpMappingAddress, EnterTime, onDoubleClick }) => {
//     return (
//         <tr>
//             <td>{Device}</td>
//             <td>{CustomerState}</td>
//             <td>{ProductName}</td>
//             <td>{StaffName}</td>
//             <td>{CustomerId}</td>
//             <td>{Uid}</td>
//             <td>{CustomerName}</td>
//             <td>{CustomerIp}({CustomerIpMappingAddress})</td>
//             <td>{EnterTime}</td>
//         </tr>
//     )
// }