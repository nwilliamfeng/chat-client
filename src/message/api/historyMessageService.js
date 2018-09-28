import { serviceUrls } from './serviceUrls';
import { util, appContext } from '../../util';
import {random} from 'lodash';


class HisotryMessageService {

    /**
     * 返回指定客户id的历史消息
     * @param {string} customerId 
     * @param {string} startTime //sample: '2018-03-23'
     * @param {number} type 
     * @param {number} sort 
     * @param {number} index 
     * @param {number} pageSize 
     * @param {string} appKey 
     * @returns  {TotalItemCount: 0, PageSize: 10, CurrentPageIndex: 0, Results:[]}
     */
    async getMessagesByCustomerId(customerId, startTime, type, sort, index, pageSize, appKey) {
        const url = serviceUrls.URL_GET_MESSAGES_BY_CUSTOMER_ID;
        const res = await util.fetchWithPost(url,
            {
                customerId,
                startTime,
                type,
                sort,
                index,
                pageSize,
                appKey,
                maxcount: 10000,
            });
        if (res.RetCode === 1) {
          
            return res.Data; //sample:TotalItemCount: 5, PageSize: 50, CurrentPageIndex: 1, Results:[]
        }
        else {
            return { TotalItemCount: 0, PageSize: 10, CurrentPageIndex: 0, Results: [] }
        }
    }

    // offlineMsgCache=[];

    
     
    // async getMessagesByChannelId(channelId, startTime, type, sort, index, pageSize, appKey,customer) {
    //     if(this.offlineMsgCache.length>0 && this.offlineMsgCache[0].Results[0].Sender!==customer.CustomerId){
    //         this.offlineMsgCache=[];
    //     }
    //     const old=this.offlineMsgCache.find(x=>x.CurrentPageIndex===index);
    //     if(old!=null ){
    //         return old;
    //     }
    //     const url = serviceUrls.URL_GET_MESSAGES_BY_CUSTOMER_ID;
    //     const res = await util.fetchWithPost(url,
    //         {
    //             customerId:channelId,
    //             startTime,
    //             type,
    //             sort,
    //             index,
    //             pageSize,
    //             appKey,
    //             maxcount: 10000,
    //         });
    //     if (res.RetCode === 1) {
    //         //todo-- 测试这里用假数据------------------------------
    //         const count =random(28,43);
    //         const str='自联邦公开市场委员会8月份召开会议以来所收到的信息表明，就业市场已继续增强，经济活动一直都在强劲上升。最近几个月以来，平均而言就业增长一直都很强劲，失业率一直保持在较低水平。家庭支出和商业固定投资一直都强劲增长。按12个月基础计算，整体通货膨胀与扣除粮食和能源以外项目的通货膨胀仍保持在接近于2%的水平';
    //         for (let i = 0; i < 10; i++) {
    //             const id=util.guid();
    //             const isStaff=i%2===0;
    //             const num=this.offlineMsgCache.length*10+ i;
    //             const msg =  {
    //                 ChannelID: channelId,
    //                 MsgId: id,
    //                 AvataUrl:isStaff?appContext.currentStaff.AvataUrl:  'https://avator.eastmoney.com/qface/8247513267045400/120',
    //                 SenderName:isStaff?appContext.currentStaff.StaffName:customer.CustomerName,
    //                 Sender:isStaff?appContext.currentStaff.StaffId :customer.CustomerId,
    //                 MessageContent:  num+'.'+ str.substring(num,str.length-num),
    //                 SendTime:new Date(Date.now()-num*10000),
    //             };
    //             if(num % 5===0 && isStaff){
    //                 msg.MessageContent='{Url:http://61.129.129.189:7480/ZrhdWZaXSB/1e4670f4-6753-4736-a397-346fa21dcfb120180401210453921.docx,FileName:test.docx,ThumbUrl:,UrlEnd:UrlEnd}';
    //             }
    //             if(num % 3 ===0 ){
    //                 msg.MessageContent='{Url:http://61.129.129.189:7480/ZrhdWZaXSB/a12abba937274dd5ab71bad4f929136clogo2.png,FileName:logo2.png,ThumbUrl:http://61.129.129.189:7480/ZrhdWZaXSB/a12abba937274dd5ab71bad4f929136clogo2.png,UrlEnd:UrlEnd}'
    //             }
    //             if(num<count)
    //             res.Data.Results.push(msg);
    //         }
    //         res.Data.Results.reverse();
    //         res.Data.CurrentPageIndex=index;
    //         res.Data.PageSize=10;
    //         res.Data.TotalItemCount=count;
    //         this.offlineMsgCache.push(res.Data);
    //         //-------------------------------------------------------
    //         return res.Data; //sample:TotalItemCount: 5, PageSize: 50, CurrentPageIndex: 1, Results:[]
    //     }
    //     else {
    //         return { TotalItemCount: 0, PageSize: 10, CurrentPageIndex: 0, Results: [] }
    //     }
    // }

}




/**
 * 历史消息服务实例
 */
export const historyMessageService = new HisotryMessageService();
