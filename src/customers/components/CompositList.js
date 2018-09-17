import React from 'react';
import { StaffList } from '../../staff/components';
import { CustomerList } from './CustomerList';
import styled from 'styled-components';

const Div = styled.div`
    padding:5px;
`;

export const CompositList = () => {
    return (
        <Div>
            <StaffList />

            <CustomerList />
        </Div>
    )
}