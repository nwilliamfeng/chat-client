import { staffStateValues } from '../auth/constants'

class AppContext {

    constructor() {
        const stData = localStorage.getItem(AppContext.name);
        this._staff = stData ? JSON.parse(stData).staff : null;
    }

    /**
     * 定义常量设置项名称
     */
    static get name() {
        return 'AppContext';
    }

    get appKeys() {
        const staff = this.currentStaff;
        if (staff == null) {
            return [];
        }
        else {
            console.log(staff);
            return staff.AppKeys.split(',');
        }
    }

    get currentStaff() {
         return this._staff;
    }



    set currentStaff(staff) {
        this._staff=staff;
        const item = localStorage.getItem(AppContext.name);

        const data = item ? JSON.parse(item) : {};

        data.staff = staff;

        localStorage.setItem(AppContext.name, JSON.stringify(data));
    }


    clear() {
        localStorage.removeItem(AppContext.name);
    }
}

export const appContext = new AppContext();