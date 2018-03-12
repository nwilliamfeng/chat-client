/**
 * 服务地址
 */
export const customerServiceUrls={
     /**
      * 获取客户列表接口
      */
     URL_GET_CUSTOMER_LIST:"/staff/GetCustomerList",

     /**
      * 获取客服列表
      */
     URL_GET_STAFF_LIST:'/staff/GetStaffList',

    
     getFullUrl:function(url){
       
        return url;
    //   return  '/staff/'+url;
     }
}