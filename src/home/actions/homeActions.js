import { constants } from '../constants';


export const homeActions = {
    changePage,
    closeDetailPane,
}


function changePage(page) {
    return   { 
        type: constants.PAGE_SELECT, 
        page,
       
    } ;
     
}

function closeDetailPane(){
    return{
        type:constants.CLOSE_DETAIL_PANE,
    }
}

