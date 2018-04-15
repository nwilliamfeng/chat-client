import { staffStateValues } from '../auth/constants'

export default class AuthHelper {

    static getStaffState(stateString) {
        if (stateString === 'Online') {
            return staffStateValues.ONLINE;
        }
        else if (stateString === 'Leave') {
            return staffStateValues.LEAVE;
        }
        else if (stateString === 'Transfer') {
            return staffStateValues.TRANSFER;
        }
    }

    static getStaffStateString(state) {
        switch (state) {
            case staffStateValues.LEAVE:
                return '离开';
            case staffStateValues.ONLINE:
                return '在线';
            case staffStateValues.TRANSFER:
                return '转接';
            case staffStateValues.OFFLINE:
                return '离线';
            default:
                return '';
        }
    }

   
}