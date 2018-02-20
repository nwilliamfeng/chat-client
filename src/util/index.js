import {netUtil} from './net';
import {promiseUtil} from './promise';
 

export * from './history';
//export * from './promise';
//export * from './net';
export * from './appSettings';
export * from './appContext';



export const util={
  
    fetchWithPost:promiseUtil.fetchWithPost,
    sleep:promiseUtil.sleep,
    getIpAddress :netUtil.getIpAddress,
}