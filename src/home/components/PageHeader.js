import React from 'react';
import { pageType } from '../constants';




export const PageHeader = ({ isSelect, page, onClick }) => {

    const handleClick = () => {
        onClick(page);
    }

    let icon = null;
    switch (page) {
        case pageType.CHAT:
            icon = 'fa fa-comment';
            break;
        case pageType.OTHER:
            icon = 'fa fa-user';
            break;
        default:
            break;
    }

    const liStyle ={
        color:isSelect===true? 'rgb(57, 206, 57)':'grey',
    }


    
    if(isSelect===false){
        icon+='-o';
    }
     
    return (
        <li className='nav_li' style={liStyle} onClick={handleClick} > <i className={icon} aria-hidden="false"></i>  </li>
    )
}
