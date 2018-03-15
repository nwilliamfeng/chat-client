import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChatList extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const { staffs } = this.props;

        return (
            <div >
            
                {staffs &&
                    <ul className="list-group list-group-hover">
                        {staffs.map((item) => (

                            <li key={item.StaffId} style={{ padding: 0, }} className='list-group-item'>
                                <ContextMenuTrigger id={this.isSelf(item) ? SELF_STAFF_CONTEXTMENU_ID : OTHER_STAFF_CONTEXTMENU_ID} attributes={this.getAttributes(item)}>
                                    <div style={liStyle}>
                                        <i className="fa fa-user-o" style={staffAvatarStyle} aria-hidden="true"></i>
                                        <span style={this.getStaffNameStyle(item)}>{item.StaffName}</span>
                                        <span>{this.fillCustomerCount(item.AssignedCustomerNumber)}</span>
                                    </div>
                                </ContextMenuTrigger>
                            </li>
                        ))}
                    </ul>
                }

                <ContextMenu id={SELF_STAFF_CONTEXTMENU_ID}>
                    <MenuItem onClick={this.handleChangeStaffStateClick} data={{ newStaffSate: staffStateValues.ONLINE }}>
                        <span style={this.getStaffStateStyle(staffStateValues.ONLINE)}>在线</span>
                    </MenuItem>
                    <MenuItem onClick={this.handleChangeStaffStateClick} data={{ newStaffSate: staffStateValues.LEAVE }}>
                        <span style={this.getStaffStateStyle(staffStateValues.LEAVE)}>离开</span>
                    </MenuItem>
                    <MenuItem onClick={this.handleChangeStaffStateClick} data={{ newStaffSate: staffStateValues.TRANSFER }}>
                        <span style={this.getStaffStateStyle(staffStateValues.TRANSFER)}>转接</span>
                    </MenuItem>
                    <MenuItem divider />
                    <SubMenu title='自动回复'>
                        <MenuItem onClick={this.sendAutoReplyMessage} data={{ autoReplyMessage: '马上回来' }}>马上回来</MenuItem>
                        <MenuItem onClick={this.sendAutoReplyMessage} data={{ autoReplyMessage: '现在忙' }}>现在忙</MenuItem>
                        <MenuItem onClick={this.sendAutoReplyMessage} data={{ autoReplyMessage: '正在会议中' }}>正在会议中</MenuItem>
                    </SubMenu>
                    <MenuItem divider />
                    <MenuItem onClick={this.handleContextMenuClick}>注销</MenuItem>
                    <MenuItem onClick={this.handleContextMenuClick}>退出 </MenuItem>
                </ContextMenu>
                <ContextMenu id={OTHER_STAFF_CONTEXTMENU_ID}>
                    <MenuItem onClick={this.handleContextMenuClick}>客服聊天</MenuItem>
                    <MenuItem onClick={this.handleContextMenuClick}>转接</MenuItem>
                </ContextMenu>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}


const page = connect(mapStateToProps, null)(ChatList);

/**
 * ChatList实例
 */
export { page as ChatList };
