import React  from 'react'
import styled from 'styled-components'


const Span=styled.div`
    padding:3px 5px;
    color: ${props=>props.color?props.color:'black'};
    text-align:center;
    cursor:default;
`;

const containerStyle = {
    display: 'block',
    clear: 'right',
    textAlign: 'right',
    paddingTop:8,
}
 




const bodyStyle = {
    float: 'right',
    clear: 'left',
}


export const SystemMessage = ({ content ,onClick,color}) => {
   
    const handleClick=()=>{
        if(onClick!=null){
            onClick();
        }
    }
    return (
        <Span color={color} onClick={handleClick}>{content}</Span>
    )
}


