 class AppSettings{
   

    constructor(){
        this.appKey='';
       // this.lastLoginName='';
       // this.lastPassword='';
        let setting =localStorage.getItem('IMAppSettings');
        if(setting==null){
            this.save();
        }
        else{
            this.appKey =JSON.parse(setting).appKey;
        }

        
    }

    save(){
        localStorage.setItem("IMAppSettings",JSON.stringify(this));
    }


}

export const  appSettings= new AppSettings();