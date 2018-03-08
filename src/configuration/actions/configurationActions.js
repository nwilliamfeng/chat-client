import { constants } from '../constants';
import { configurationService as service } from '../api';
import { history, util, appSettings, appContext } from '../../util';
 


/**
 * action工厂实例
 */
export const configurationActions = {

    /**
     * 获取常用语列表
     */
    fetchCommonPhrase,

    selectCommonPhraseNode,

}

/**
 * 获取客户列表action
 */
function fetchCommonPhrase() {
    return async dispatch => {
        const { staffId, token, ip, appKey } = appContext.getStaffParams();
        const { RetCode, Message, Data } = await service.getCommonPhrase(staffId,token,ip,appKey);

        if (RetCode == 1) {
            //":[{"PhraseId":28,"Category":"问候语","SmallCategoryId":27,"SmallCategoryName":"你好","Title":"测试","Content":"测试","CategorySort":0,"AppKey":null,"AppKeyId":8}...]
        
            dispatch({ type: constants.GET_COMMON_PHRASE_SUCCESS, commonPhrase: Data });
        }
    }
}

/**
 * 选中节点
 * @param {*} node 
 */
function selectCommonPhraseNode(node){
    return {
        type:constants.SELECT_COMMON_PHRASE_NODE,
        selectedCommonPhraseNode:node,
    };
}

//todo -- add客服配置和自动回复action



