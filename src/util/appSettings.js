 class AppSettings{
   

    constructor(){
       
        this.appKey='';
        this.autoSplitInputContent=true;
       // this.lastLoginName='';
       // this.lastPassword='';
        const setting =localStorage.getItem('IMAppSettings');
        if(setting==null){
            this.save();
        }
        else{
            const json= JSON.parse(setting);
            this.appKey =json.appKey;
            this.autoSplitInputContent =json.autoSplitInputContent;
        }

       
    }

    save(){
        localStorage.setItem("IMAppSettings",JSON.stringify(this));
    }


}

export const  appSettings= new AppSettings();