import {netUtil} from './net';
import {promiseUtil} from './promise';
import {dateUtil} from './date';
import { mathEx } from './math';

 

export * from './history';
export * from './appSettings';
export * from './appContext';
export * from './defaultEmojiMapping';
export * from './chatRegionHelper'; 
export * from './math';


export const util={
  
    fetchWithPost:promiseUtil.fetchWithPost,
    sleep:promiseUtil.sleep,
    getIpAddress :netUtil.getIpAddress,
    dateFormat:dateUtil.dateFormat,
    csharpDateFormat:dateUtil.cSharpDateFormat,
    today:dateUtil.today,
    guid:mathEx.guid,
}