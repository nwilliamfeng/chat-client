import React from 'react'
import styled from 'styled-components'

const Span = styled.span`
    background:lightgray;       
    align-self:center;
    border-radius:3px;
    cursor:default;
    padding:3px 5px;
    color: ${props => props.color ? props.color : 'white'};
    font-size:12px;`

const Div = styled.div`
    display:flex;
    flex-direction:column; 
    margin-bottom:10px;
    margin-top:10px;`

/**
 * 系统消息
 * @param {*} param0 
 */
export const SystemMessage = ({ content, onClick, color }) => <Div color={color} onClick={onClick}><Span>{content}</Span></Div>



