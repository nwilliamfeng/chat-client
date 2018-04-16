import { constants } from '../constants';



 
export const homeActions = {

    
    notifyNavibarWidthChange,
   // notifyNavibarHeightChange,
 
    notifyCustomerListWidthChange,

    notifyChatWidthChange,
    
    queryChatWidth,

    changePage,
}

 
function notifyNavibarWidthChange(width) {
    return   { 
        type: constants.NAVIBAR_WIDTH_CHANGED, 
        width,
    } ;
     
}

function changePage(page) {
    return   { 
        type: constants.PAGE_SELECT, 
        page,
       
    } ;
     
}

function notifyChatWidthChange(width) {
    return   { 
        type: constants.CHAT_WIDTH_CHANGE, 
        width,
    } ;
     
}

 

function notifyCustomerListWidthChange(width) {
    return   { 
        type: constants.CUSTOMER_LIST_WIDTH_CHANGED, 
        width,
    } ;
     
}

function queryChatWidth(){
    return   { 
        type: constants.CHAT_WIDTH_QUERY, 
    } ;
}


