import React from 'react'
import styled from 'styled-components'


 

const Div = styled.div`
    background:lightgray;    
    border-radius:3px;
    text-align:center;
    margin-left:30%;
    margin-right:30%;
    padding:3px 5px;
    margin-bottom:10px;
    margin-top:10px;
    color: ${props => props.color ? props.color : 'white'};
    cursor:default;
    display:inline-block;
    font-size:12px;
   
`;

export const SystemMessage = ({ content, onClick, color }) => {

    const handleClick = () => {
        if (onClick != null) {
            onClick();
        }
    }
    return (
        <Div color={color} onClick={handleClick}>{content}</Div>
       
    )
}


