import { constants } from '../constants';



 
export const homeActions = {

    
    notifyNavibarWidthChange,
    notifyNavibarHeightChange,
   // notifyCustomerListInitSize,
  //  notifyCustomerListHeightChange,
    notifyCustomerListWidthChange,

    
}

 
function notifyNavibarWidthChange(width) {
    return   { 
        type: constants.NAVIBAR_WIDTH_CHANGED, 
        width,
    } ;
     
}

function notifyNavibarHeightChange(height) {
    return   { 
        type: constants.NAVIBAR_HEIGHT_CHANGED, 
        height,
    } ;
     
}

// function notifyCustomerListHeightChange(height) {
//     return   { 
//         type: constants.CUSTOMER_LIST_Height_CHANGED, 
//         height,
//     } ;
     
// }

// function notifyCustomerListInitSize(height,width) {
//     return   { 
//         type: constants.CUSTOMER_LIST_INIT_SIZE, 
//         height,
//         width,
//     } ;
     
// }

function notifyCustomerListWidthChange(width) {
    return   { 
        type: constants.CUSTOMER_LIST_WIDTH_CHANGED, 
        width,
    } ;
     
}


