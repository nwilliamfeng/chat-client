 class AppSettings{
   

    constructor(){
       
        this.appKey='';
        this.autoSplitInputContent=true;
        this.autoReplyMessage=null;
       // this.lastLoginName='';
       // this.lastPassword='';
        const setting =localStorage.getItem('IMAppSettings');
        if(setting==null){
            this.save();
        }
        else{
            const json= JSON.parse(setting);
            this.appKey =json.appKey;
            this.autoReplyMessage =json.autoReplyMessage;
            this.autoSplitInputContent =json.autoSplitInputContent;
            if(this.autoSplitInputContent==null){
                this.autoSplitInputContent=true;
            }
        }

       
    }

    save(){
        localStorage.setItem("IMAppSettings",JSON.stringify(this));
    }


}

export const  appSettings= new AppSettings();