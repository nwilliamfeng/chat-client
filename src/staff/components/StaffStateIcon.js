import React from 'react';
import PropTypes from 'prop-types';
import { staffStateValues } from '../../auth/constants/staffStates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faCheckCircle, faTimesCircle, faClock } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

/**
 * 获取图标数据
 * @param {*} state 
 */
const getIconData = state => {
    switch (state) {
        case staffStateValues.LEAVE:
            return faClock;
        case staffStateValues.ONLINE:
            return faCheckCircle;
        case staffStateValues.TRANSFER:
            return faShare;
        default:
            return faTimesCircle;
    }
}

const Icon = styled(FontAwesomeIcon)`
    border-radius:30px;
    color:${props => {
        switch (props.state) {
            case staffStateValues.LEAVE:
                return '#AFEEEE';
            case staffStateValues.ONLINE:
                return '#39CE39';
            case staffStateValues.TRANSFER:
                return 'white';
            default:
                return '#DAA520';
        }
    }};

    background:${props => {
        switch (props.state) {
            case staffStateValues.TRANSFER:
                return '#DAA520';
            default:
                return 'white';
        }
    }};

    padding:${props => {
        switch (props.state) {
            case staffStateValues.TRANSFER:
                return '2px';
            default:
                return '0px';
        }
    }};
`;

/**
 * 客服状态图标
 * @param {*} param0 
 */
export const StaffStateIcon = ({ state }) => {
    const icon = getIconData(state);
    return  <Icon icon={icon} state={state} /> 
}

StaffStateIcon.prototype = {
    state: PropTypes.oneOf([staffStateValues.LEAVE, staffStateValues.OFFLINE, staffStateValues.ONLINE, staffStateValues.TRANSFER]),
}

