export default class CustomerHelper {

    /**
     * 将整型值转换为对应的客户状态
     * @param {number} state 
     * @returns {string} 
     */
    static getStateInfo(state) {
        switch (state) {
            case 0:
                return '离线';
            case 1:
                return '等待';
            case 2:
                return '会话中';
            default:
                return '未知';
        }

    }

}