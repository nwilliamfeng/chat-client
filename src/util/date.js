// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
 
function dateFormat(date, fmt) {  
   
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * 返回几天前的日期
 * @param {number} days 
 */
function substactDays(days) {  
    let date =new Date();
    date =new Date(date.getFullYear(),date.getMonth(),date.getDate());
    date.setTime(date.getTime()-24*60*60*1000*days);
    return date;
}

/**
 * c#日期格式转换
 * @param {string} date 
 * @param {string} format
 */
function cSharpDateFormat(date,format='yyyy-MM-dd hh:mm:ss') {
    if (date == null) {
        return "";
    }
    date = date.replace("/Date(", "").replace(")/", "");
    if (date.indexOf("+") > 0) {
        date = date.substring(0, date.indexOf("+"));
    }
    else if (date.indexOf("-") > 0) {
        date = date.substring(0, date.indexOf("-"));
    }
    var date = new Date(parseInt(date, 10));
    var time = dateFormat(date, format);
    return time;
}

/**
 * 返回当天0时
 * @returns {Date}
 */
function today(){
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return today;
}

/**
 * 日期工具实例
 */
export const dateUtil ={
    dateFormat,
    substactDays,
    cSharpDateFormat,
    today,
}