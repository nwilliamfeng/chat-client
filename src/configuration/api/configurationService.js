import { util } from '../../util';
import { constants } from '../constants';
import { configurationServiceUrls as serviceUrls } from './configurationServiceUrls';


/**
 * 客服配置服务类
 */
class ConfigurationService {

    constructor() {

    }

     /**
     * 获取常用语列表
     * @param {string} staffId 
     * @param {string} token 
     * @param {string} ip 
     * @param {string} appKey 
     * @returns {{RetCode:number,Message:string,Data:Any}}
     */
    async getCommonPhrase(staffId,token,ip,appKey){
        const url =  serviceUrls.URL_GET_COMMON_PHRASE ;     
        return await util.fetchWithPost(url, { staffId, token, ip, appKey });
    }
    
}

/**
 * 客服配置服务实例
 */
export const configurationService = new ConfigurationService();
