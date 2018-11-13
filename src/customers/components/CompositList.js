import React from 'react';
import { StaffList } from '../../staff/components';
import { CustomerList } from './CustomerList';

export const CompositList = () => {
    return (
        <React.Fragment>
            <StaffList />
      
            <CustomerList />
        </React.Fragment>
    )
}