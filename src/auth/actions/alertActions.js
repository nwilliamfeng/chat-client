import {alertTypes} from '../constants';

 
 export const  alertActions={
    loginSuccess,

 }


 export const loginSuccess=(message)=>({
    type:alertTypes.loginSuccess,

    message:message,

 })
