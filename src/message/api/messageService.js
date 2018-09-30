import { serviceUrls } from './serviceUrls';
import { util, appContext } from '../../util';
import { random, remove } from 'lodash';



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

    // remove(channelId) {
    //     remove(this._msgLstCache, x => x.channelId === channelId);
    // }

    // getChatMessages(channelId) {
    //     const item = this._msgLstCache.find(x => x.channelId === channelId);
    //     if (item == null) {
    //         return [];
    //     }
    //     return [...item.msgs];
    // }

    // getChatOfflineMessageInfo(channelId) {
    //     const item = this._msgLstCache.find(x => x.channelId === channelId);
    //     if (item == null) {
    //         return { offlineMsgPageIdx: 0, offlineMsgPageCount: 0, };
    //     }
    //     const { offlineMsgPageIdx, offlineMsgPageCount } = item;
    //     return { offlineMsgPageIdx, offlineMsgPageCount };
    // }


    // loadOfflineMessages(chat, index=0) {
    //     const pageSize = 10;
    //     const { customer, channelId } = chat;
    //     const empty = { offlineMsgPageIdx: 0, offlineMsgPageCount: 0 };
    //     let item = this._msgLstCache.find(x => x.channelId === channelId);
    //     if (item != null && (item.offlineMsgPageIdx === item.offlineMsgPageCount - 1 || item.offlineMsgPageCount === 0)) {
    //         return empty;
    //     }
    //     if (item == null) { //如果不存在先创建一个实例
    //         item = { ...defaultChatMsg, channelId };
    //         this._msgLstCache.push(item);
    //     }

    //     //todo-- 测试这里用假数据------------------------------
    //     const count = item.offlineMsgPageCount === 0 ? random(3, 34) : item.offlineMsgPageCount;

    //     const str = '自联邦公开市场委员会8月份召开会议以来所收到的信息表明，就业市场已继续增强，经济活动一直都在强劲上升。最近几个月以来，平均而言就业增长一直都很强劲，失业率一直保持在较低水平。家庭支出和商业固定投资一直都强劲增长。按12个月基础计算，整体通货膨胀与扣除粮食和能源以外项目的通货膨胀仍保持在接近于2%的水平';
    //     for (let i = 0; i < 10; i++) {
    //         const id = util.guid();
    //         const isStaff = i % 2 === 0;
    //         const num = index * 10 + i;
    //         const start = random(3, 40);
    //         const end = random(41, str.length - 1);
    //         const msg = {
    //             ChannelID: channelId,
    //             MsgId: id,
    //             AvataUrl: isStaff ? appContext.currentStaff.AvataUrl : 'https://avator.eastmoney.com/qface/8247513267045400/120',
    //             SenderName: isStaff ? appContext.currentStaff.StaffName : customer.CustomerName,
    //             Sender: isStaff ? appContext.currentStaff.StaffId : customer.CustomerId,
    //             MessageContent: num + '.' + str.substring(start, end),
    //             SendTime: new Date(Date.now() - num * 10000),
    //         };
    //         if (num % 5 === 0 && isStaff) {
    //             msg.MessageContent = '{Url:http://61.129.129.189:7480/ZrhdWZaXSB/1e4670f4-6753-4736-a397-346fa21dcfb120180401210453921.docx,FileName:test.docx,ThumbUrl:,UrlEnd:UrlEnd}';
    //         }
    //         if (num % 3 === 0) {
    //             msg.MessageContent = '{Url:http://61.129.129.189:7480/ZrhdWZaXSB/a12abba937274dd5ab71bad4f929136clogo2.png,FileName:logo2.png,ThumbUrl:http://61.129.129.189:7480/ZrhdWZaXSB/a12abba937274dd5ab71bad4f929136clogo2.png,UrlEnd:UrlEnd}'
    //         }
    //         if (num < count) {
    //             item.msgs = [msg, ...item.msgs];
    //         }

    //     }
    //     item.offlineMsgPageIdx = index;
    //     if (item.offlineMsgPageCount === 0) {
    //         item.offlineMsgPageCount = Number.parseInt((count / pageSize).toFixed(0));
    //     }

    //     const { offlineMsgPageCount, offlineMsgPageIdx } = item;

    //     return { offlineMsgPageCount, offlineMsgPageIdx };

    // }

    isOfflineMessageLoaded(chat) {
        if (chat == null) {
            return false;
        }
        const { offlineMsgPageCount, offlineMsgPageIdx } = chat;
        if (offlineMsgPageIdx < 0) {
            return false;
        }
        return (offlineMsgPageCount == 0 && offlineMsgPageIdx == 0) || (offlineMsgPageIdx == offlineMsgPageCount - 1);
    }

    updateMessagesRead(unreadMsgs){
        if(unreadMsgs==null || unreadMsgs.length===0){
            return;
        }
        unreadMsgs.forEach(msg => {
            msg.isUnread=false;
        });
    }

    _getMsgs(){
        let result =[];
        result.push('245asfd[:dai]789769asdfsad');
        result.push('自联邦[:dai]公开市场委员会8月份召开会议以来所收到的信息表明，就业市场[:dai]已继续增强，经济活动一直都在强劲上升。最近几个月以来，平均而言就业');
        result.push('Nice o[:dai]信息simple non-mutative soluti');
        result.push('at[:djy][:djy][:djy]Parameter');
        result.push('[:se]一直都在强劲上升。最近[:tp]几个月以来');
        result.push('到[:djy]的[:dai]信息表明，就业市场[:tp]已继续增强');
        result.push('[:se]一[:hx1]直。最近[:tp]几个月以来');
        result.push('上面的例子中，wrapperComponent渲染接受后，我们就可以拿到WrappedComponent组件[:dai]的实例，进而实现调用[:dai]实例方法的操作(当然这样会在一定程度上是反模式的，不是非常的推荐)。');
        result.push('const [last] = [1, 3, 4, 5].slice(-1)');
        result.push('上面的例子非常简单，但足以说明问题。我们可以看见函数HOC返回了新的组件(WrapperComponent)，这个组件原封不动的返回作为参数的组件(也就是被包裹的组件:WrappedComponent)，并将传给它的参数(props)全部传递给被包裹的组件(WrappedComponent)。这么看起来好像并没有什么作用，其实属性代理的作用还是非常强大的');
        return result;
    }

    loadOfflineMessages(chat, index = 0) {
        const pageSize = 10;
        if (chat == null || this.isOfflineMessageLoaded(chat)) {
            return;
        }

        const { customer, channelId, offlineMsgPageCount } = chat;


        //todo-- 测试这里用假数据------------------------------
        const count = offlineMsgPageCount === 0 ? random(3, 34) : offlineMsgPageCount;

        const rd =random(0,9);
        const str =this._getMsgs()[ rd] ;
        for (let i = 0; i < 10; i++) {
            const id = util.guid();
            const isStaff = i % 2 === 0 && rd % 2===0;
            const num = index * 10 + i;
      
            const msg = {
                isUnread:index===0,
                ChannelID: channelId,
                MsgId: id,
                AvataUrl: isStaff ? appContext.currentStaff.AvataUrl : 'https://avator.eastmoney.com/qface/8247513267045400/120',
                SenderName: isStaff ? appContext.currentStaff.StaffName : customer.CustomerName,
                Sender: isStaff ? appContext.currentStaff.StaffId : customer.CustomerId,
                MessageContent:`(${num}): ${str}`,
                SendTime: new Date(Date.now() - num * 10000),
            };
            if (num % 2 === 0 && rd>4 && isStaff) {
                msg.MessageContent = '{Url:http://61.129.129.189:7480/ZrhdWZaXSB/1e4670f4-6753-4736-a397-346fa21dcfb120180401210453921.docx,FileName:test.docx,ThumbUrl:,UrlEnd:UrlEnd}';
            }
            if (num % 3 === 0 && rd>8) {
                msg.MessageContent = '{Url:http://61.129.129.189:7480/ZrhdWZaXSB/a12abba937274dd5ab71bad4f929136clogo2.png,FileName:logo2.png,ThumbUrl:http://61.129.129.189:7480/ZrhdWZaXSB/a12abba937274dd5ab71bad4f929136clogo2.png,UrlEnd:UrlEnd}'
            }
            if (num < count) {
                chat.messages = [msg, ...chat.messages];
            }

        }
        chat.offlineMsgPageIdx = index;
        if (chat.offlineMsgPageCount === 0) {
            chat.offlineMsgPageCount = Number.parseInt((count / pageSize).toFixed(0));
        }
    }

}

/**
 * 消息服务实例
 */
export const messageService = new MessageService();
