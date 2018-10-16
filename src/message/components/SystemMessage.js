import React from 'react'
import styled from 'styled-components'

const Span = styled.span`
    background:lightgray;       
    align-self:center;
    border-radius:3px;
    cursor:default;
    padding:3px 5px;
    color: ${props => props.color ? props.color : 'white'};
    font-size:12px;
`;


const Div = styled.div`
    display:flex;
    flex-direction:column; 
    margin-bottom:10px;
    margin-top:10px;
`;

export const SystemMessage = ({ content, onClick, color }) => {

    const handleClick = () => {
        if (onClick != null) {
            onClick();
        }
    }
    return (
        <Div color={color} onClick={handleClick}>
            <Span>{content}</Span>
        </Div>

    )
}


