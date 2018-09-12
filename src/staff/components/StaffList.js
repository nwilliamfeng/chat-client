import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rx from 'rx';
import { appContext } from '../../util';
import { staffActions } from '../actions';
import { loginStates } from '../../auth/constants';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as fastar2 } from '@fortawesome/free-regular-svg-icons';
import { StaffContextMenu } from './StaffContextMenu';
import { isEqual, groupBy } from 'lodash';
import styled from 'styled-components';
require('../../assets/styles/li.css');

const STAFF_CONTEXTMENU_ID = 'SELF_STAFF_CONTEXTMENU_ID';
const OTHER_STAFF_CONTEXTMENU_ID = 'OTHER_STAFF_CONTEXTMENU_ID';


const styles = {
    staffList: {
        padding: 0,
    },
    star: {
        marginLeft: 3,
        color: 'blue',
    },
    staffLi: {
        height: 32,
        paddingLeft: 5,

        paddingTop: 7,
        paddingBottom: 5,
    },
}
const StaffUl=styled.ul`
  &:hover{
    background-color: #DEDBDA;
  }
`;

const staffNameStyle = isSelf => {
    return {
        color: isSelf ? 'orange' : 'black',
        maxWidth: 75,
        verticalAlign: 'middle',
        display: 'inline-block',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        cursor: 'default',
        marginLeft: 10,
        marginRight: 10,
    }
}

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
        result.push(<FontAwesomeIcon key={i} icon={cn} size={10} style={styles.star} />);
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
        <li style={styles.staffList} className='list-group-item'>
            <ContextMenuTrigger id={isSelf ? STAFF_CONTEXTMENU_ID : OTHER_STAFF_CONTEXTMENU_ID} attributes={{ staffdata: JSON.stringify(data) }}>
                <div style={styles.staffLi}>
                    <FontAwesomeIcon icon={faUser} color='gray' />
                    <span title={StaffName} style={staffNameStyle(isSelf)}>{StaffName}</span>
                    <ChatCounter count={AssignedCustomerNumber} />
                </div>
            </ContextMenuTrigger>
        </li>)
}

/**
 * 客服组
 * @param {*} param0 
 */
const StaffGroup = ({ staffs }) => {
    return (
        <div>
            {staffs[0].GroupName}
            <StaffUl className='list-group'>
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

class StaffList extends Component {

    constructor(props) {
        super(props);
        // const a = [{ part: 'a', name: 'abc' }, { part: 'a', name: 'abcd' }, { part: 'b', name: 'bcd' }, { part: 'b', name: 'bcde' }];
        // const x = groupBy(a, 'part');
        // console.log(x);
        // const  d=Object.values(x);
        // console.log(d);
    }

    componentDidMount() {
        const { loginState } = this.props;
        if (loginState != null && loginState === loginStates.LOGGED_IN) {
            this.subscribeStaffList();
        }
    }

    componentWillUnmount() {
        if (this.subscription != null) {
            this.subscription.dispose();
        }
    }

    subscribeStaffList() {
        const source = Rx.Observable
            .interval(3000 /* ms */)
            .timeInterval();
        this.subscription = source.subscribe(
            () => {
                if (appContext.currentStaff != null) {
                    const { dispatch } = this.props;
                    dispatch(staffActions.fetchStaffList());
                }
                else {
                    this.subscription.dispose();
                }
            },
            (err) => {
                console.log('Error: ' + err);
            },
            () => {
                console.log('Completed');
            });
    }

    componentWillUpdate() {
        const { loginState } = this.props;
        if (loginState != null && loginState === loginStates.LOGGED_OUT) {
            if (this.subscription != null) {
                this.subscription.dispose();
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !isEqual(this.props.staffs, nextProps.staffs); //如果是客服列表相同则跳过
    }


    render() {
        const { staffs, dispatch } = this.props;
        const groups =staffs? Object.values( groupBy(staffs)) :[];
        const staffCount =staffs? staffs.length :0;
        return (
            <div style={{leftPadding:5}}>
                {/* {staffs &&
                    <ul className='list-group list-group-hover'>
                        {staffs.map(item => <StaffItem key={item.StaffId} data={item} />)}
                    </ul>
                } */}
                {`部门-组别 (${staffCount})`}
                 {groups.length>0 &&
                    <ul className='list-group list-group-hover'>
                        {groups.map(group => <StaffGroup staffs={group} />)}
                    </ul>
                }
                <StaffContextMenu dispatch={dispatch} contextMenuId={STAFF_CONTEXTMENU_ID} />
                <OtherStaffContextMenu dispatch={dispatch} contextMenuId={OTHER_STAFF_CONTEXTMENU_ID} />
            </div>
        );
    }
}



const mapStateToProps = state => {
    const { loginState } = state.auth;
    const { staffs } = state.staff;
    return { staffs, loginState };
}


const page = connect(mapStateToProps, null)(StaffList);

/**
 * 客服列表实例
 */
export { page as StaffList }; 
