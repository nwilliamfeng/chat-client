import {alertTypes} from '../constants';

 
 export const  alertActions={
    success,
    error,

 }

 const success =(message)=>({
    type:alertTypes.SUCCESS,message:message
 });

 const error =(message)=>({
    type:alertTypes.ERROR,message:message
 });



  