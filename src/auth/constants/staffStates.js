/**
 * 客服状态
 */
export const staffStates={

    STAFF_ONLINE:'STAFF_ONLINE', //在线
    
    STAFF_LEAVE:"STAFF_LEAVE", //离开

    STAFF_TRANSFER:'STAFF_TRANSFER', //转接

    STAFF_OFFLINE:'STAFF_OFFLINE', //离线
}

/** 
 * 客服状态对应的整型值
 */
export const staffStateValues={

    /**
     * 离线状态
     */
    OFFLINE:0, 

    ONLINE:1,

    LEAVE: 3,

    TRANSFER:4,

}