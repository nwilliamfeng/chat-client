//import _staffs from './staffs.json';
import Staff from '../Staff';
import {promiseUtil as util} from '../../util';


 class AuthService{

    // login(userName,userPassword){
    //     console.log("execute loginService...");
    //     return {result:1, data:{staffId:'3001',staffName:userName,logintime:new Date(),staffState:1}};
    // }

   async login(userName,userPassword){
       await util.sleep(3000);
        console.log("execute loginService...");
        if(localStorage.getItem('user' )==null){
            let staff =new Staff(userName,userPassword);
            localStorage.setItem('user',JSON.stringify(staff));
        }
        return {result:1, data:{staffId:'3001',staffName:userName,logintime:new Date(),staffState:1}};
    }

   
 }

 export const authService= new AuthService();

