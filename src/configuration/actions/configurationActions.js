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
 

}

/**
 * 获取客户列表action
 */
function fetchCommonPhrase() {
    return async dispatch => {
        const { staffId, token, ip, appKey } = appContext.getStaffParams();
        const { RetCode, Message, Data } = await service.getCommonPhrase(staffId,token,ip,appKey);
        if (RetCode == 1) {
            dispatch({ type: constants.GET_COMMON_PHRASE_SUCCESS, commonPhrase: Data });
        }
    }
}

//todo -- add客服配置和自动回复action



