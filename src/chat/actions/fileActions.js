import { constants } from '../constants';
import { fileUploadService } from '../api';
import {  appContext } from '../../util';


/**
 * 文件 Action工厂实例
 */
export const fileActions = {
 
    uploadImage,

  //  uploadFile,

}


/**
 * 返回指定客户id的历史消息
 * 
 */
function uploadImage(fileName,base64Content,imUserID,accessToken){

    return async dispatch =>{
      const dr= await  fileUploadService.uploadImage(fileName,base64Content,imUserID,accessToken);
      console.log(dr);
    //  dispatch({type:constants.LOAD_HISTORY_MESSAGE,historyResult});
    }
}

 
 