  export default class Staff{
      constructor(){
        this.IsPrivateMessage=false;
        this.Token='';
        this.StaffId='';
        this.StaffName='';  
        this.AssignedCustomerNumber=0;
        this.StaffState=0;
       
       this.StaffImUserId ='';

        this.AppKeys='';
 
        this.IsOfflineMessage =false;
        this.StaffTips =''; //客服端提示 格式{"OfflineMessageTip":"您确认要关闭聊天窗口"}
        this.IMUserEntity=[];
      }
  }

 
   