//import _staffs from './staffs.json';




 class AuthService{

    login(userName,userPassword){
        console.log("execute loginService...");
        return {result:1, data:{staffId:'3001',staffName:userName,logintime:new Date(),staffState:1}};
    }
 }

 export const authService= new AuthService();

