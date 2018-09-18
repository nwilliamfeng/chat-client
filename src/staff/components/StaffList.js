import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as fastar2 } from '@fortawesome/free-regular-svg-icons';
import { StaffContextMenu } from './StaffContextMenu';
import { isEqual, groupBy } from 'lodash';
import styled from 'styled-components';
import {ExpandPanel} from '../../controls';
require('../../assets/styles/li.css');
const STAFF_CONTEXTMENU_ID = 'SELF_STAFF_CONTEXTMENU_ID';
const OTHER_STAFF_CONTEXTMENU_ID = 'OTHER_STAFF_CONTEXTMENU_ID';


/**
 * staff自定义ul
 */
const StaffUl = styled.ul`
   list-style: none;
   width:100vh;
  `;

const GroupUl=styled(StaffUl)``;

/**
 * staff自定义li
 */
const StaffLi = styled.li`
    padding:5px 10px;
    outline:none;
    text-align:left;
     
    margin-left:-85px;
    &:hover{
        background-color: #DEDBDA;
    };
    &:hover ${Avata} {
        color: orangered; 
    }
    color: gray;
  `;


/**
 * 客服名称span
 */
const StaffNameSpan = styled.span`
     color: ${props => props.isSelf ? 'orange' : 'black'};
     max-width: 75px;
     width:75px;
     vertical-align:middle;
     display:inline-block;
     overflow:hidden;
     white-space:nowrap;
     text-overflow:ellipsis;
     cursor:default;
     margin-left:10px;
     margin-right:10px;
`;

/**
 * 会客数FontAwesomeIcon
 */
const Star = styled(FontAwesomeIcon)`
    margin-left:3px;
    color:orangered;
    text-align:right;
`;

const Avata = styled(FontAwesomeIcon)`
   
`;

/**
 * 会话数组件
 * @param {*} param0 
 */
const ChatCounter = ({ count }) => {
    let result = [];
    count++;
    let capacity = 5;
    for (let i = 0; i < capacity; i++) {
        const cn = (i < count) ? faStar : fastar2;
        result.push(<Star key={i} icon={cn} size={'xs'} />);
    }
    return result;
}

/**
 * 客服项
 */
const StaffItem = ({ data }) => {
    const { StaffName, AssignedCustomerNumber, StaffId } = data;
    const isSelf = StaffId === appContext.currentStaff.StaffId;
    return (
        <StaffLi>
            <ContextMenuTrigger id={isSelf ? STAFF_CONTEXTMENU_ID : OTHER_STAFF_CONTEXTMENU_ID} attributes={{ staffdata: JSON.stringify(data) }}>
                <Avata icon={faUser} />
                <StaffNameSpan title={StaffName} isSelf={isSelf}>{StaffName}</StaffNameSpan>
                <ChatCounter count={AssignedCustomerNumber} />
            </ContextMenuTrigger>
        </StaffLi>)
}

/**
 * 客服组
 * @param {*} param0 
 */
const StaffGroup = ({ staffs }) => {
    const groupName =staffs[0].GroupName;
    return (
        <div>
           { groupName && <ExpandPanel title={ staffs[0].GroupName}/> }
            <StaffUl>
                {staffs.map(item => <StaffItem key={item.StaffId} data={item} />)}
            </StaffUl>
        </div>
    )
}

/**
 * 其他客服的快捷菜单
 * @param {*} param0 
 */
export const OtherStaffContextMenu = ({ contextMenuId, dispatch }) => {
    const handleContextMenuClick = ({ target }) => {
        const staff = JSON.parse(target.getAttribute('staffdata'));
        alert(staff.StaffName);
    }
    return (
        <ContextMenu id={contextMenuId}>
            <MenuItem onClick={handleContextMenuClick}>客服聊天</MenuItem>
            <MenuItem onClick={handleContextMenuClick}>转接</MenuItem>
        </ContextMenu>)
}

const ContainerDiv=styled.div`
   padding-left:5px;
`;

class StaffList extends Component {

    constructor(props) {
        super(props);
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !isEqual(this.props.staffs, nextProps.staffs); //如果是客服列表相同则跳过
    }


    render() {
        const { staffs, dispatch } = this.props;
        const groups = staffs ? Object.values(groupBy(staffs)) : [];
        const staffCount = staffs ? staffs.length : 0;
        return (
            <ContainerDiv>
                {`部门-组别 (${staffCount})`}
                {groups.length > 0 &&
                    <GroupUl>
                        {groups.map(group => <StaffGroup staffs={group} />)}
                    </GroupUl>
                }
                <StaffContextMenu dispatch={dispatch} contextMenuId={STAFF_CONTEXTMENU_ID} />
                <OtherStaffContextMenu dispatch={dispatch} contextMenuId={OTHER_STAFF_CONTEXTMENU_ID} />
            </ContainerDiv>
        );
    }
}



const mapStateToProps = state => {
    const { staffs } = state.staff;
    return { staffs };
}


const page = connect(mapStateToProps, null)(StaffList);

/**
 * 客服列表实例
 */
export { page as StaffList }; 
