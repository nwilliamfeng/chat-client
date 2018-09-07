import React from 'react';
import PropTypes  from 'prop-types';
import { pageType } from '../constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComment,faUser} from '@fortawesome/free-regular-svg-icons';
import {faComment as faComment2,faUser as faUser2} from '@fortawesome/free-solid-svg-icons';
 

const getIcon=(isSelect, page)=>{
    switch (page) {
        case pageType.CHAT:
            return isSelect? faComment2 :faComment;            
        case pageType.OTHER:
            return isSelect? faUser2 :faUser;
        default:
            return null;
    }
}

getIcon.prototype={
    isSelect: PropTypes.bool.isRequired,
    page: PropTypes.oneOf([pageType.CHAT,pageType.OTHER]).isRequired,
}


const getTooltip=page=>{
    switch (page) {
        case pageType.CHAT:
            return '消息';
        case pageType.OTHER:
            return '其他';
        default:
            return null;
    }
}

/**
 * 导航栏的PageHeader
 * @param {*} param0 
 */
export const PageHeader = ({ isSelect, page, onClick }) => {

    const handleClick = () => onClick(page);
 
    const liStyle ={
        color:isSelect===true? 'rgb(57, 206, 57)':'grey',
    }

    return (<li className='nav_li' title={getTooltip(page)} style={liStyle} onClick={handleClick} > <FontAwesomeIcon icon={getIcon(isSelect,page)}/></li>)
}

PageHeader.prototype={
    isSelect: PropTypes.bool.isRequired,
    page : PropTypes.oneOf([pageType.CHAT,pageType.OTHER]).isRequired,
    onClick:PropTypes.func.isRequired,
}

