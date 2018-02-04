import {authTypes} from '../constants';
import {authService} from '../api';

 
 export const  authActions={
    login,
    
 }

const createDispatchContent =(type,user)=>{
  return {type:type,user:user};
}


//  function login(username, password) {
//     return dispatch => {
//         dispatch(request({ username }));

//         userService.login(username, password)
//             .then(
//                 user => { 
//                     dispatch(success(user));
//                     history.push('/');
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };

//     function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
//     function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
// }
 

  function login(userName,userPassword){
     
    return  dispatch =>{
        let json =authService.login(userName,userPassword);
        if(json.result==1){
            dispatch(createDispatchContent(authTypes.LOGIN_SUCCESS, json.data));
        }
        else{
            dispatch(createDispatchContent(authTypes.LOGIN_FAIL)); 
        }
        
    }
 }
