import React from 'react';
import { StaffList } from '../../staff/components';
import { CustomerList } from './CustomerList';
import styled from 'styled-components';

 

export const CompositList = () => {
    return (
        <div>
            <StaffList />
      
            <CustomerList />
        </div>
    )
}