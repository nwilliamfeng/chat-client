import Staff from '../models/staff';

class AppContext {

    constructor() {


    }

    get currentStaff() {
        const item = localStorage.getItem("AppContext");
        return item ? JSON.parse(item) : null;
    }

    set currentStaff(staff) {
        const item = localStorage.getItem("AppContext");

        const data = item ? JSON.parse(item) : {};
        data.staff = staff;
        localStorage.setItem("AppContext", JSON.stringify(data));
    }
}

export const appContext = new AppContext();