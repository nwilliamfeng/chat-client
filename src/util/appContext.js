import Staff from '../models/staff';

class AppContext {
    
    constructor() {

    }

    /**
     * 定义常量设置项名称
     */
    static get name() {
        return 'AppContext';
      }

    get currentStaff() {
        const item = localStorage.getItem(AppContext.name);
        return item ? JSON.parse(item).staff : null;
    }
    
    get appKeys(){
        const staff =this.currentStaff;
        if(staff==null){
            return [];
        }
        else{
            console.log(staff);
            return staff.AppKeys.split(',');
        }
    }

    set currentStaff(staff) {
        const item = localStorage.getItem(AppContext.name);

        const data = item ? JSON.parse(item) : {};
        data.staff = staff;
        localStorage.setItem(AppContext.name, JSON.stringify(data));
    }

    clear(){
        localStorage.removeItem(AppContext.name);
    }
}

export const appContext = new AppContext();