
import { constants } from '../constants';



 
export const systemActions = {

    /**
     * 通知错误
     */
    notifyError,
   
}

 
function notifyError(message) {
    return   { 
        type: constants.SERVER_ERROR_MESSAGE, 
        message,
    } ;
     
}

 

 
 
