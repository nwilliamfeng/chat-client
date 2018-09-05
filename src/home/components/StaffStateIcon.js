
import React from 'react';
import { staffStateValues } from '../../auth/constants/staffStates';
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare ,faCheckCircle, faTimesCircle ,faClock} from '@fortawesome/free-solid-svg-icons';
 

const styles = {
    online: {
        background: 'white',
        padding:0, 
        borderRadius: 30,
        fontSize:10,
    },

    leave: {
        background: 'white',
        padding: 1,
        
        fontSize: 10,
        borderRadius: 30,
    },

    offline: {
       
        background: 'white',
        padding: 0,
        
        fontSize: 10,
        borderRadius: 30,
      
    },

    div:{
        marginLeft: 30, 
        paddingTop: 25,
    }
}

export const StaffStateIcon = ({ state }) => {
    switch (state) {
        case staffStateValues.LEAVE:
            return <div style={styles.div}><FontAwesomeIcon icon={faClock} color='#AFEEEE' style={styles.leave} /></div>
        case staffStateValues.ONLINE:
            return <div style={styles.div}><FontAwesomeIcon icon={faCheckCircle} color='#39CE39' style={styles.online} /></div>

        case staffStateValues.OFFLINE:
            return <div style={styles.div}><FontAwesomeIcon icon={faTimesCircle} color='#DAA520' style={styles.offline} /></div>
        default:
            return <div style={styles.div}></div>
    }
}

 