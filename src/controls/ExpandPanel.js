import React from 'react';
import styled from 'styled-components';


const Div=styled.div`
    padding:5px;
    width:100%;
    background-color:aliceblue;
`;

export const ExpandPanel=({title})=>{
    if(title==null){
        return <div/>
    }
  return (
      <Div>{title}</Div>
  )
}