import { constants } from '../constants';


export const homeActions = {
    changePage,
}


function changePage(page) {
    return   { 
        type: constants.PAGE_SELECT, 
        page,
       
    } ;
     
}

