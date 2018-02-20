import { authService } from './authService';

class HeartWatchService {

    constructor() {
        this.authService = authService;
        this.isStart = false;
        this.intervalHandle = 0;
        this.errorCount = 0;

    }

    /**
     * 启动服务
     * @param {string} staffId 
     * @param {string} token 
     * @param {string} ip 
     * @param {string} appKey 
     * @param {*} errorCallback
     * @returns {{RetCode:number,Message:string,Data:Any}}
     */
    start(staffId, token, ip, appKey, errorCallback) {
        if (this.isStart != true) {
            this.isStart = true;
            this.intervalHandle = setInterval(async () => {
                const result = await this.authService.sendStaffHeart(staffId, token, ip, appKey);
                if (result.RetCode != 0) {

                    this.errorCount += 1;

                    if (errorCallback != null) {
                        errorCallback(this.errorCount);
                    }
                    if (this.errorCount >= 10) {
                        this.stop();
                    }
                }
                else {
                    console.log("heart ok!");
                }
            }, 10 * 1000);
        }


    }

    stop() {
        if (this.isStart == true) {
            clearInterval(this.intervalHandle);
            this.isStart = false;
            this.errorCount = 0;
        }
    }
}


export const heartWatchService = new HeartWatchService();