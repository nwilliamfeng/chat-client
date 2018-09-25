import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as fastar2 } from '@fortawesome/free-regular-svg-icons';
import { StaffContextMenu } from './StaffContextMenu';
import { isEqual, groupBy } from 'lodash';
import styled from 'styled-components';
import { ExpandPanel } from '../../controls';
import Rx from 'rx';
import { loginStates } from '../../auth/constants';
import { staffActions } from '../actions';
import AvatarImg from '../../assets/imgs/avatar.png';
const STAFF_CONTEXTMENU_ID = 'SELF_STAFF_CONTEXTMENU_ID';
const OTHER_STAFF_CONTEXTMENU_ID = 'OTHER_STAFF_CONTEXTMENU_ID';


/**
 * staff自定义ul
 */
const GroupUl = styled.ul`
   list-style: none;
   width:100vh;
  `;


/**
 * staff自定义li
 */
const StaffLi = styled.li`
    padding:5px 10px;
    outline:none;
    text-align:left;
    margin-left:${props => props.hasGroup ? '0px' : '-40px'} ;
    padding-left:${props => props.hasGroup ? '15px' : '10px'} ;
    &:hover{
        background-color: #DEDBDA;
    };
   
    color: gray;
  `;

const StaffGroupDiv = styled.div`
    margin-left:-40px;     
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


const AvatarSpan = styled.span`

    background-image:${props => {
        const url = props.avataUrl ? props.avataUrl : AvatarImg;
        return `url(${url})`;
    }};
    background-size:  100% 100% ;
    height:24px;
    vertical-align:middle;
    width: 24px;
    border-radius:2px;
    background-repeat:no-repeat;
    background-size:cover;
    margin-right:5px;
    display:inline-block;
`;


/**
 * 客服
 */
const Staff = ({ data }) => {
    const { StaffName, AssignedCustomerNumber, StaffId, GroupName, AvataUrl } = data;
    const isSelf = StaffId === appContext.currentStaff.StaffId;
    return (
        <ContextMenuTrigger id={isSelf ? STAFF_CONTEXTMENU_ID : OTHER_STAFF_CONTEXTMENU_ID} attributes={{ 'staffjson': JSON.stringify(data) }}>
            <StaffLi hasGroup={GroupName != null} title={StaffName}>
                <AvatarSpan avataUrl={AvataUrl} />
                <StaffNameSpan isSelf={isSelf}>{StaffName}</StaffNameSpan>
                <ChatCounter count={AssignedCustomerNumber} />
            </StaffLi>
        </ContextMenuTrigger>)
}

/**
 * 客服组
 * @param {*} param0 
 */
const StaffGroup = ({ staffs, isExpand, panelId, expandHandle }) => {
    const groupName = staffs[0].GroupName;

    return (
        <StaffGroupDiv key={groupName}>
            {groupName &&
                <ExpandPanel title={staffs[0].GroupName} count={staffs.length} isChild={true} isExpand={isExpand} panelId={panelId} expandHandle={expandHandle}>
                    {staffs.map(item => <Staff key={item.StaffId} data={item} />)}
                </ExpandPanel>}
        </StaffGroupDiv>
    )
}

/**
 * 其他客服的快捷菜单
 * @param {*} param0 
 */
export const OtherStaffContextMenu = ({ contextMenuId, dispatch }) => {
    const handleContextMenuClick = (e, data, target) => {
        const staff = JSON.parse(target.getAttribute('staffjson'));
        alert(staff.StaffName);
    }
    return (
        <ContextMenu id={contextMenuId}>
            <MenuItem onClick={handleContextMenuClick}>客服聊天</MenuItem>
            <MenuItem onClick={handleContextMenuClick}>转接</MenuItem>
        </ContextMenu>)
}

const ContainerDiv = styled.div`
`;

class StaffList extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !isEqual(this.props.staffs, nextProps.staffs); //如果是客服列表相同则跳过
    }

    componentDidMount() {
        const { loginState } = this.props;
        if (loginState != null && loginState === loginStates.LOGGED_IN) {
            this.loadStaffs();
            this.subscribeStaffList();
        }
    }

    componentWillUpdate() {
        const { loginState } = this.props;
        if (loginState != null && loginState === loginStates.LOGGED_OUT) {
            if (this.subscription != null) {
                this.subscription.dispose();
            }
        }
    }

    componentWillUnmount() {
        if (this.subscription != null) {
            this.subscription.dispose();
        }
    }

    loadStaffs = () => {
        if (appContext.currentStaff != null) {
            const { dispatch } = this.props;
            dispatch(staffActions.fetchStaffList());
        }
    }

    subscribeStaffList = () => {
        const source = Rx.Observable
            .interval(3000 /* ms */)
            .timeInterval();
        this.subscription = source.subscribe(
            () => {
                this.loadStaffs();
                if (appContext.currentStaff == null) {
                    this.subscription.dispose();
                }
            },
            err => {
                console.log('Error: ' + err);
            },
            () => {
                console.log('Completed');
            });
    }

    handleExpandState = (panelId, isExpand) => {

        const { dispatch } = this.props;
        dispatch(staffActions.changeExpandState(panelId, isExpand));
    }

    getExpandState = panelId => {
        const { expandStates } = this.props;
        const state = expandStates.find(x => x.panelId === panelId);
        if (state == null) {
            return false;
        };
        return state.isExpand;
    }

    render() {
        const { staffs, dispatch } = this.props;

        const groups = staffs ? Object.values(groupBy(staffs.filter(x => x.GroupName), 'GroupName')) : null;
        const noGroupStaffs = staffs ? staffs.filter(x => x.GroupName == null) : null;
        const staffCount = staffs ? staffs.length : 0;
        return (
            <ContainerDiv>
                <ExpandPanel title={'部门-组别'} count={staffCount} isExpand={this.getExpandState('staffRoot')} expandHandle={this.handleExpandState} panelId={'staffRoot'}>
                    {noGroupStaffs &&
                        <GroupUl>
                            {noGroupStaffs.map(staff => <Staff data={staff} key={staff.StaffId} />)}
                        </GroupUl>}
                    {groups &&
                        <GroupUl>
                            {groups.map(group => <StaffGroup staffs={group} key={group[0].GroupId} isExpand={this.getExpandState('staffGroup_' + group[0].GroupId)} expandHandle={this.handleExpandState} panelId={'staffGroup_' + group[0].GroupId} />)}
                        </GroupUl>}
                </ExpandPanel>

                <StaffContextMenu dispatch={dispatch} contextMenuId={STAFF_CONTEXTMENU_ID} />
                <OtherStaffContextMenu dispatch={dispatch} contextMenuId={OTHER_STAFF_CONTEXTMENU_ID} />
            </ContainerDiv>
        );
    }
}



const mapStateToProps = state => {
    const { staffs, expandStates } = state.staff;
    const { loginState } = state.auth;
    return { staffs, expandStates, loginState };
}


const page = connect(mapStateToProps, null)(StaffList);

/**
 * 客服列表实例
 */
export { page as StaffList }; 
