/**
 * 延迟指定的时间，单位：毫秒(ms)
 * @param {number} ms 
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// async function fetchWithPost(url,data){  
//   const response = await fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json'},
//       body: JSON.stringify(data),
//     });
//   return await response.json();
// }

/**
 * post方式的fetch
 * @param {*} url 
 * @param {*} data 
 * @param {*} headers
 */
async function fetchWithPost(url,data,headers={ 'Content-Type': 'application/json'}){  
  const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });
  return await response.json();
}



export const promiseUtil = { sleep,fetchWithPost };