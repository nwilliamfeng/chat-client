import { constants } from '../constants';



 
export const homeActions = {

    
    notifyNavibarSizeChange,

    

    
}

 
function notifyNavibarSizeChange(navibarSize) {
    return   { 
        type: constants.NAVIBAR_SIZE_CHANGED, 
        navibarSize,
    } ;
     
}

 


