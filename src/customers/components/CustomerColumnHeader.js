import React, { Component } from 'react';
import { customerActions } from '../actions'
import { connect } from 'react-redux';

const thStyle = {
    fontWeight: 'normal',
    color: 'gray',
    cursor: 'pointer',
}

const sortStyle = {
    marginLeft: 5,
    color: 'grey',
}

const getSortRegion = (sort) => {
   
    if(sort ==1){
        return <i class="fa fa-caret-up"></i>;
    }
    else  if(sort ==2){
        return <i class="fa fa-caret-down"></i>;
    }
    
    
}

export const CustomerColumnHeader = ({ name, title, getSort , onHeaderSort}) => {

    const onClick = () => {
        const oldSort=  getSort(name);
        onHeaderSort(name, oldSort==2?1:oldSort+1);
    }
    return (
        <th style={thStyle} onClick={onClick}>
            {title}<span style={sortStyle}>{getSortRegion(getSort(name))}</span>
        </th>
    )
}






