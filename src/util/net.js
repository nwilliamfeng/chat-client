
let ip=null;

function getIpAddress(){
    if(ip==null){
      ip= '172.168.11.23';
    }
    return ip;
}

export const netUtil ={
    getIpAddress,
}