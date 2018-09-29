import { serviceUrls } from './serviceUrls';
import { util, appContext } from '../../util';
import { random, remove } from 'lodash';

/**
 * 消息存储样本
 */
const defaultChatMsg = {
    channelId: '',
    offlineMsgPageIdx: 0,
    offlineMsgPageCount: 0,
    msgs: [],
}


class MessageService {

    constructor() {
        this._msgLstCache = [];
    }

    // addMessage(channelId, msg) {
    //     const exist = this._msgLstCache.find(x => x.channelId === channelId);
    //     if (exist == null) {
    //         const msgLst = { channelId, msgs: [msg] };
    //         this._msgLstCache.push(msgLst);
    //     }
    //     else {
    //         let { msgs } = exist;
    //         if (!msgs.some(x => x.id === msg.id)) {
    //             msgs.push(msg);
    //         }

    //     }
    // }

    remove(channelId) {
        remove(this._msgLstCache, x => x.channelId === channelId);
    }

    getChatMessages(channelId) {
        const item = this._msgLstCache.find(x => x.channelId === channelId);
        if (item == null) {
            return [];
        }
        return [...item.msgs];
    }

    getChatOfflineMessageInfo(channelId) {
        const item = this._msgLstCache.find(x => x.channelId === channelId);
        if (item == null) {
            return { offlineMsgPageIdx: 0, offlineMsgPageCount: 0, };
        }
        const { offlineMsgPageIdx, offlineMsgPageCount } = item;
        return { offlineMsgPageIdx, offlineMsgPageCount };
    }

    readMessages(unreadMsgs){
        if(unreadMsgs==null || unreadMsgs.length==0){
            return;
        }
        let item =this._msgLstCache.find(x=>x.channelId=== unreadMsgs[0].ChannelId);
        if(item!=null){
            item.msgs.forEach(x => {
                if(unreadMsgs.some(m=>m.MsgId===x.MsgId)){
                    x.isUnread=false;
                }
            });
        }
    }


    loadOfflineMessages(chat, index=0) {
        const pageSize = 10;
        const { customer, channelId } = chat;
        const empty = { offlineMsgPageIdx: 0, offlineMsgPageCount: 0 };
        let item = this._msgLstCache.find(x => x.channelId === channelId);
        if (item != null && (item.offlineMsgPageIdx === item.offlineMsgPageCount - 1 || item.offlineMsgPageCount === 0)) {
            return empty;
        }
        if (item == null) { //如果不存在先创建一个实例
            item = { ...defaultChatMsg, channelId };
            this._msgLstCache.push(item);
        }

        //todo-- 测试这里用假数据------------------------------
        const count = item.offlineMsgPageCount === 0 ? random(3, 34) : item.offlineMsgPageCount;

        const str = '自联邦公开市场委员会8月份召开会议以来所收到的信息表明，就业市场已继续增强，经济活动一直都在强劲上升。最近几个月以来，平均而言就业增长一直都很强劲，失业率一直保持在较低水平。家庭支出和商业固定投资一直都强劲增长。按12个月基础计算，整体通货膨胀与扣除粮食和能源以外项目的通货膨胀仍保持在接近于2%的水平';
        for (let i = 0; i < 10; i++) {
            const id = util.guid();
            const isStaff = i % 2 === 0;
            const num = index * 10 + i;
            const start = random(3, 40);
            const end = random(41, str.length - 1);
            const msg = {
                isUnread:index===0?true:false,
                ChannelID: channelId,
                MsgId: id,
                AvataUrl: isStaff ? appContext.currentStaff.AvataUrl : 'https://avator.eastmoney.com/qface/8247513267045400/120',
                SenderName: isStaff ? appContext.currentStaff.StaffName : customer.CustomerName,
                Sender: isStaff ? appContext.currentStaff.StaffId : customer.CustomerId,
                MessageContent: num + '.' + str.substring(start, end),
                SendTime: new Date(Date.now() - num * 10000),
            };
            if (num % 5 === 0 && isStaff) {
                msg.MessageContent = '{Url:http://61.129.129.189:7480/ZrhdWZaXSB/1e4670f4-6753-4736-a397-346fa21dcfb120180401210453921.docx,FileName:test.docx,ThumbUrl:,UrlEnd:UrlEnd}';
            }
            if (num % 3 === 0) {
                msg.MessageContent = '{Url:http://61.129.129.189:7480/ZrhdWZaXSB/a12abba937274dd5ab71bad4f929136clogo2.png,FileName:logo2.png,ThumbUrl:http://61.129.129.189:7480/ZrhdWZaXSB/a12abba937274dd5ab71bad4f929136clogo2.png,UrlEnd:UrlEnd}'
            }
            if (num < count) {
                item.msgs = [msg, ...item.msgs];
            }

        }
        item.offlineMsgPageIdx = index;
        if (item.offlineMsgPageCount === 0) {
            item.offlineMsgPageCount = Number.parseInt((count / pageSize).toFixed(0));
        }

        const { offlineMsgPageCount, offlineMsgPageIdx } = item;

        return { offlineMsgPageCount, offlineMsgPageIdx };

    }

}

/**
 * 消息服务实例
 */
export const messageService = new MessageService();
