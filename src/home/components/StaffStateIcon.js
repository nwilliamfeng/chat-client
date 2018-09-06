
import React from 'react';
import PropTypes from 'prop-types';
import { staffStateValues } from '../../auth/constants/staffStates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare ,faCheckCircle, faTimesCircle ,faClock} from '@fortawesome/free-solid-svg-icons';
 

const styles = {
    default: {
        background: 'white',
        padding:0, 
        borderRadius: 30,      
    },

    transfer: {
        background: '#DAA520',
        padding:2,       
        borderRadius: 30,
    },
  
    div:{
        marginLeft: 30, 
        paddingTop: 25,
    }
}

/**
 * 获取图标参数
 * @param {*} state 
 */
const getIconParams=(state)=>{
    switch (state) {
        case staffStateValues.LEAVE:
            return {icon:faClock,color:'#AFEEEE',style:styles.default};  
        case staffStateValues.ONLINE:
            return {icon:faCheckCircle,color:'#39CE39',style:styles.default};  
        case staffStateValues.TRANSFER:
            return {icon:faShare, color:'white', style:styles.transfer};    
        default:
            return {icon:faTimesCircle,color:'#DAA520',style:styles.default};  
    }
}

export const StaffStateIcon = ({ state }) => {
    const {icon,color,style} =getIconParams(state);
    return <div style={styles.div}><FontAwesomeIcon icon={icon} color={color} style={style} /></div> 
}

StaffStateIcon.prototype={
    state:PropTypes.oneOf([staffStateValues.LEAVE,staffStateValues.OFFLINE,staffStateValues.ONLINE,staffStateValues.TRANSFER]),
}

 