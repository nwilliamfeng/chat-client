/**
 * 服务地址
 */
export const configurationServiceUrls={
     
     /**
      * 获取常用语列表
      */
     URL_GET_COMMON_PHRASE:'staff/GetCommonPhrase',

     
   
     getFullUrl:function(url){
       
       //return url;
         return  '/staff/'+url;
     }
}