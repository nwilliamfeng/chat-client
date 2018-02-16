/**
 * 服务地址
 */
export const serviceUrls={
     /**
      * 登录接口
      */
     URL_LOGIN:"/staff/Login",

     /**
      * 注销接口
      */
     URL_LOGOUT:"/staff/Logout",

    /**
     * 发送心跳接口
     */
     URL_HEART :"/staff/SendStaffHeart",

     /**
      * 更改客服状态接口
      */
     URL_CHANGE_STAFF_STATE: "/staff/ChangeStaffState",


     getFullUrl:function(url){
       //   return 'http://imapitest.eastmoney.com:2021/'+url;
       return url;
      //  return  '/webimservice/'+url;
     }

  
}