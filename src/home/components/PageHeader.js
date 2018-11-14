import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { pageType } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faUser } from '@fortawesome/free-regular-svg-icons';
import { faComment as faComment2, faUser as faUser2 } from '@fortawesome/free-solid-svg-icons';


const getIcon = (isSelect, page) => {
    switch (page) {
        case pageType.CHAT:
            return isSelect ? faComment2 : faComment;
        case pageType.CUSTOMER_LIST:
            return isSelect ? faUser2 : faUser;
        default:
            return null;
    }
}

getIcon.propTypes = {
    isSelect: PropTypes.bool.isRequired,
    page: PropTypes.oneOf([pageType.CHAT, pageType.CUSTOMER_LIST]).isRequired,
}


const getTooltip = page => {
    switch (page) {
        case pageType.CHAT:
            return '消息';
        case pageType.CUSTOMER_LIST:
            return '客户';
        default:
            return null;
    }
}

const Li = styled.li`
    color: ${props=>props.isSelect? 'rgb(57, 206, 57)'  :  'grey' };
    width: 100%;
    padding-top: 5px;
    padding-bottom: 8px;
    text-align: center;
    font-size: 24px;  
    cursor: pointer;
    &:hover{
        color:${props=>props.isSelect? 'rgb(57, 206, 57)'  :  'lightgrey' };
    }
`;

/**
 * 导航栏的PageHeader
 * @param {*} param0 
 */
export const PageHeader = ({ isSelect, page, onClick }) => {

    const handleClick = () => onClick(page);

    return (<Li title={getTooltip(page)} isSelect={isSelect} onClick={handleClick} > <FontAwesomeIcon icon={getIcon(isSelect, page)} /> </Li>)
}

PageHeader.propTypes = {
    isSelect: PropTypes.bool.isRequired,
    page: PropTypes.oneOf([pageType.CHAT, pageType.CUSTOMER_LIST]).isRequired,
    onClick: PropTypes.func.isRequired,
}

