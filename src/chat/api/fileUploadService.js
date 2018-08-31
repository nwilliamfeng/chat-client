import { chatServiceUrls as serviceUrls } from './chatServiceUrls';
import { util } from '../../util';



/**
 * 文件上传服务
 */
class FileUploadService {
    async uploadImage(imageName,base64Content,imUserID,accessToken) {
 
        const url = serviceUrls.URL_UPLOAD_IMAGE;
        const headers={ 
            
            'imUserID':imUserID,
            'accessToken': accessToken,
        }
        const res= await util.fetchWithPost(url,{imageName,base64Content} ,headers);
        if(res.RetCode===1){
            return res.Data; //sample:TotalItemCount: 5, PageSize: 50, CurrentPageIndex: 1, Results:[]
        }
        else{
            return {TotalItemCount: 0, PageSize: 10, CurrentPageIndex: 0, Results:[]}
        }
    }
  

}

/**
 * 文件上传服务实例
 */
export const fileUploadService = new FileUploadService();
