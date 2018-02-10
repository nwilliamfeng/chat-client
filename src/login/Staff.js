 export default class Staff{
    

     constructor( name,password ){
          this._name=name;
          this._password =password;
     }

     get name(){
         return this._name;
     }

     get password(){
         return this._password;
     }


 }

  