import {netUtil} from './net';
import {promiseUtil} from './promise';
import {dateUtil} from './date';
 

export * from './history';
export * from './appSettings';
export * from './appContext';
 


export const util={
  
    fetchWithPost:promiseUtil.fetchWithPost,
    sleep:promiseUtil.sleep,
    getIpAddress :netUtil.getIpAddress,
    dateFormat:dateUtil.dateFormat,
}