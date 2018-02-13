 export default class Staff{
    

     constructor( name,password,staffId,loginTime){
          this._name=name;
          this._password =password;
          this._staffId=staffId;
          this._loginTime=loginTime;
     }

     get name(){
         return this._name;
     }

     get password(){
         return this._password;
     }

     get staffId(){
         return this._staffId;
     }

     get loginTime(){
         return this._loginTime;
     }


 }

  