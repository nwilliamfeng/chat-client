import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from "reactjs-popup";
import Rx from 'rx';
import AvatarImg from '../../assets/imgs/avatar.png';
import { loginStates } from '../../auth/constants';
import { appContext } from '../../util';
import { staffActions } from '../actions';
import styled from 'styled-components';
import { ContextMenuTrigger } from "react-contextmenu";
import { StaffContextMenu } from './StaffContextMenu'; 
import { StaffStateIcon } from './StaffStateIcon';
require('../../assets/styles/button.css');
require('../../assets/styles/menu.css');
require('../../assets/styles/nav_ul.css');

// const avatarStyle = {
//     margin: 12,
//     marginTop: 18,
//     cursor: 'pointer',
//     backgroundImage: `url(${AvatarImg})`,
//     backgroundSize: '100% 100%',
//     height: 36,
//     width: 36,
// }

const AvataDiv = styled.div`
    margin: 18px 12px 12px 12px;
    cursor:pointer;
    background-image:${props => 
    {
        const url =props.user? props.user.AvataUrl: AvatarImg;
        return `url(${url})`;
    }};
    background-size:  100% 100% ;
    height:34px;
    width: 34px;
    border-radius:3px;
    background-repeat:no-repeat;
    background-size:cover;
`;

const StateDiv = styled.div`
    margin-left:28px;
    padding-top:23px;
`;


/**
 * 客服快捷菜单Id
 */
const STAFF_CONTEXTMENU_ID = 'STAFF_CONTEXTMENU_ID';

class StaffProfile extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { loginState } = this.props;
        if (loginState != null && loginState === loginStates.LOGGED_IN) {
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

    subscribeStaffList = () => {
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

    render() {
        const { user, dispatch } = this.props;
        if(user!=null)
        console.log(user.AvataUrl);
        return (
            <div>
                <ContextMenuTrigger id={STAFF_CONTEXTMENU_ID}>
                    <Popup
                        trigger={
                            <AvataDiv user={user}>
                                {user && <StateDiv><StaffStateIcon state={user.StaffState} /></StateDiv>}
                            </AvataDiv>}
                        position="right top"
                        on="click"
                        closeOnDocumentClick
                        arrow={false} >
                        <div>此人深不可测~ </div>
                    </Popup>
                </ContextMenuTrigger>
                <StaffContextMenu dispatch={dispatch} contextMenuId={STAFF_CONTEXTMENU_ID} />
            </div>
        )
    }
}


function mapStateToProps(state) {
    const { user, loginState } = state.auth;
    return {
        user,
        loginState,
    };
}


const page = connect(mapStateToProps)(StaffProfile);

/**
 * 客服头像
 */
export { page as StaffProfile }; 
