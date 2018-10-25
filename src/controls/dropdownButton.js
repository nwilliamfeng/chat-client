import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import Popup from "reactjs-popup"


const Menu = styled.div`
    width: 150px;   
    display: flex;
    flex-direction: column;
    background: #2A2A2A;
    color: gray;
`;

const MenuItemDiv = styled.div`  
    cursor: pointer;
    padding-left: 25px;
    padding-top: 10px;
    padding-bottom: 10px;    
    &:hover {   
        background: #2F3134;
    }
`;


const popupContentStyle = (hOffset, vOffset) => {
    return {
        padding: "0px",
        border: "none",
        width: 150,
        backgroundColor: 'transparent',
        marginTop: vOffset?vOffset:0,
        marginLeft:hOffset?hOffset:0,
    }
}

const MenuItem=({onClick,title})=> <MenuItemDiv onClick={onClick}>{title}</MenuItemDiv>

export const dropdownButton =Button=> ({ showInBottom = false, hOffset = 0, vOffset = 0,menuItems }) => <Popup
    trigger={() => (<Button/>)}
    position={showInBottom === false ? "right top" : "right bottom"}
    on="click"
    closeOnDocumentClick
    mouseLeaveDelay={300}
    mouseEnterDelay={0}
    contentStyle={popupContentStyle(hOffset,vOffset)}
    arrow={false} >
    {menuItems && <Menu>
        {menuItems.map(x=><MenuItem {...x}/>)}

    </Menu>}

</Popup>
