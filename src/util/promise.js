/**
 * 延迟指定的时间，单位：毫秒(ms)
 * @param {*} ms 
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


 
  export const promiseUtil={sleep};