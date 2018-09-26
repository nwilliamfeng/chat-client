import { serviceUrls } from './serviceUrls';
import { util, appContext } from '../../util';



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

     offlineMsgCache=[];

     
    async getMessagesByChannelId(channelId, startTime, type, sort, index, pageSize, appKey) {

        const old=this.offlineMsgCache.find(x=>x.CurrentPageIndex===index);
        if(old!=null){
            return old;
        }
        const url = serviceUrls.URL_GET_MESSAGES_BY_CUSTOMER_ID;
        const res = await util.fetchWithPost(url,
            {
                customerId:channelId,
                startTime,
                type,
                sort,
                index,
                pageSize,
                appKey,
                maxcount: 10000,
            });
        if (res.RetCode === 1) {
            //todo-- 测试这里用假数据------------------------------
           // SenderName\":\"投资顾问宣亮亮 执业编号A0320611010003\",\"Sender\":\"QKB001\",\"ChannelId\":null,\"MsgId\":\"4800625296879757264\",\"SendTime\":\"2018-09-14T06:07:30.217Z\",\"MessageContent\":\"现在忙\",\"type\":1,\"Introduction\":null,\"AvataUrl\":\"http://61.129.129.189:7480/MiImvufXeE/73264bb7ab7b41e4900229d689c82c7eabb.jpg\",\"CorrectedSendTime\":\"2018-09-14T14:07:30.217Z\"},{\"ID\":null,\"SenderName\":\"xuyangbo\",\"Sender\":\"9084094592206602\",\"ChannelId\":null,\"MsgId\":\"5586694820918542111\",\"SendTime\":\"2018-09-14T06:07:29.78Z\",\"MessageContent\":\"34\",\"type\":1,\"Introduction\":\"\",\"AvataUrl\":\"https://avator.eastmoney.com/qface/9084094592206602/120\",\"CorrectedSendTime\":\"2018-09-14T14:07:29.78Z\"},{\"ID\":null,\"SenderName\":\"投资顾问宣亮亮 执业编号A0320611010003\",\"Sender\":\"QKB001\",\"ChannelId\":null,\"MsgId\":\"5477473164693959035\",\"SendTime\":\"2018-09-14T05:53:07.42Z\",\"MessageContent\":\"{Url:http://61.129.129.189:7480/akgVTWCLLx/999a89dd47e04e79915fa15c3ac5ccf5%E5%A4%B4%E5%83%8F%E4%B8%9A%E5%8A%A1.png,FileName:%E5%A4%B4%E5%83%8F%E4%B8%9A%E5%8A%A1.png,ThumbUrl:http://61.129.129.189:7480/akgVTWCLLx/999a89dd47e04e79915fa15c3ac5ccf5%E5%A4%B4%E5%83%8F%E4%B8%9A%E5%8A%A1.png,UrlEnd:UrlEnd}\",\"type\":1,\"Introduction\":null,\"AvataUrl\":\"http://61.129.129.189:7480/MiImvufXeE/73264bb7ab7b41e4900229d689c82c7eabb.jpg\",\"CorrectedSendTime\":\"2018-09-14T13:53:07.42Z\"},{\"ID\":null,\"SenderName\":\"投资顾问宣亮亮 执业编号A0320611010003\",\"Sender\":\"QKB001\",\"ChannelId\":null,\"MsgId\":\"5652603992905381000\",\"SendTime\":\"2018-09-14T05:52:31.467Z\",\"MessageContent\":\"{Url:http://61.129.129.189:7480/akgVTWCLLx/3f6b9613f01f4190881389c5628ca1bdtmp_man.png,FileName:tmp_man.png,ThumbUrl:http://61.129.129.189:7480/akgVTWCLLx/3f6b9613f01f4190881389c5628ca1bdtmp_man.png,UrlEnd:UrlEnd}\",\"type\":1,\"Introduction\":null,\"AvataUrl\":\"http://61.129.129.189:7480/MiImvufXeE/73264bb7ab7b41e4900229d689c82c7eabb.jpg\",\"CorrectedSendTime\":\"2018-09-14T13:52:31.467Z\"}]}}"],"ExceptionMsg":null,"FromIP":"No IP Address"}
  
            for (let i = 0; i < 10; i++) {
                const id=util.guid();
                const isStaff=i%2===0;
                const msg =  {
                    ChannelID: channelId,
                    MsgId: id,
                    AvataUrl:isStaff?appContext.currentStaff.AvataUrl:  'https://avator.eastmoney.com/qface/8247513267045400/120',
                    SenderName:isStaff?appContext.currentStaff.StaffName:'客户',
                    Sender:isStaff?appContext.currentStaff.StaffId :'customer',
                    MessageContent: isStaff? i+'来自于客户的消息：'+Date.now():i+'来自于客服的消息：'+Date.now(),
                    SendTime:new Date(),
                };
                res.Data.Results.push(msg);
            }

            res.Data.CurrentPageIndex=index;
            res.Data.PageSize=10;
            res.Data.TotalItemCount=34;
            this.offlineMsgCache.push(res.Data);
            //-------------------------------------------------------
            return res.Data; //sample:TotalItemCount: 5, PageSize: 50, CurrentPageIndex: 1, Results:[]
        }
        else {
            return { TotalItemCount: 0, PageSize: 10, CurrentPageIndex: 0, Results: [] }
        }
    }

}




/**
 * 历史消息服务实例
 */
export const historyMessageService = new HisotryMessageService();
