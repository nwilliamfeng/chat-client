  class Staff{
      constructor(){
        this.IsPrivateMessage=false;
        this.Token='';
        this.StaffId='';
        this.StaffName='';  
        this.AssignedCustomerNumber=0;
        this.StaffState=0;
       
       this.StaffImUserId ='';

        this.AppKeys=[];
 
        this.IsOfflineMessage =false;
      //  public string StaffTips { get; set; }//客服端提示 格式{"OfflineMessageTip":"您确认要关闭聊天窗口"}
       // public List<IMUserEntity> IMUserEntity { get; set; }
      }
  }

  export const currentStaff=new Staff();