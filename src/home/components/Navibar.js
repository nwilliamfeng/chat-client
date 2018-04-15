import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from "reactjs-popup";
import { authActions } from '../../auth/actions';
import { staffStateValues } from '../../auth/constants/staffStates'
import AvatarImg from '../../assets/imgs/avatar.png';
import AuthHelper from '../../auth/authHelper';
require('../../assets/styles/button.css');
require('../../assets/styles/menu.css');
require('../../assets/styles/nav_ul.css');

const avatarStyle = {
    margin: 12,
    marginTop: 18,
    cursor: 'pointer',
    backgroundImage: `url(${AvatarImg})`,
    backgroundSize: '100% 100%',
    height: 36,
    width: 36,
}

const settingBtnStyle = {
    padding: 20,
    paddingTop: 30,
    fontSize: 23
}

const navibarStyle = {
    height: '100%',
}

const arrowStyle =(width=50)=>( {
    marginLeft: width,
    color: 'white',
})


class Navibar extends Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.changeStaffState = this.changeStaffState.bind(this);
         
    }

    createNaviLi(fontIconName) {
        return (<li className='nav_li'>
            <input type="radio" id={fontIconName} name="selector" />
            <label for={fontIconName}><i className={fontIconName} aria-hidden="true"></i></label>
            <div className="check"><div className="inside"></div></div>
        </li>)
    }

    createStaffState(state) {
        let icon = null;
        let bg = 'transparent';
        switch (state) {
            case staffStateValues.LEAVE:
                icon = 'fa fa-clock-o';
                bg = '#AFEEEE';
                break;
            case staffStateValues.ONLINE:
                icon = 'fa fa-check';
                bg = '#39CE39';
                break;
                case staffStateValues.TRANSFER:
                icon = 'fa fa-share';
                bg = '#DAA520';
                break;
            case staffStateValues.OFFLINE:
                icon = 'fa fa-close';
                bg = '#D3D3D3';
                break;
            default:
                break;
        }
        return (
            <div style={{ marginLeft: 30, paddingTop: 25 }}><i className={icon} style={{ background: bg,padding:1,color:'white', fontSize: 10, borderRadius: 3 }} aria-hidden="true"></i></div>
        )
    }

    /**
     * 注销
     */
    handleLogout() {
        const { dispatch } = this.props;
        dispatch(authActions.logout());
    }

    /**
     * 更改客服状态
     * @param {*} e 
     */
    changeStaffState(e) {
        const { key } = e._targetInst;
        const { dispatch } = this.props;
        dispatch(authActions.changeStaffState(Number.parseInt(key)));
    }


    render() {
        const staffName = this.props.user ? this.props.user.StaffName : '';
        const stateStr = this.props.user ? '(' + AuthHelper.getStaffStateString(this.props.user.StaffState) + ')' : '';

        return (
            <div style={navibarStyle}>
                <div style={{ width: '100%', height: 'calc(100% - 100px)' }}>
                    <Popup
                        trigger={
                            <div style={avatarStyle}>
                                {this.props.user && this.createStaffState(this.props.user.StaffState)}
                            </div>}
                        position="right top"
                        on="click"
                        closeOnDocumentClick
                        arrow={false}
                    >
                        <div>此人深不可测~ </div>
                    </Popup>

                    <ul className='nav_ul'>
                        {this.createNaviLi('fa fa-comment')}
                        {this.createNaviLi('fa fa-user')}

                    </ul>
                </div>


                <Popup
                    trigger={open => (
                        <button style={settingBtnStyle} className='metroBtn'><i className="fa fa-bars" aria-hidden="true"></i></button>
                    )}
                    position="right bottom" on="click"
                    closeOnDocumentClick                  
                    mouseLeaveDelay={300}
                    mouseEnterDelay={0}
                    contentStyle={{ padding: "0px", border: "none", width: 150, backgroundColor: 'transparent', marginTop: -20 }}
                    arrow={false} >

                    <div className="menu">
                        <Popup
                            trigger={<div className="menu-item">更改状态<i className="fa fa-caret-right" style={arrowStyle()} aria-hidden="true"></i></div>}
                            position="right top"
                            on="click"
                            closeOnDocumentClick
                            mouseLeaveDelay={300}
                            mouseEnterDelay={0}
                            contentStyle={{ padding: "0px", border: "none", width: 150, backgroundColor: 'transparent', }}
                            arrow={false}
                        >
                            <div className="menu">
                                <div className="menu-item" key={staffStateValues.ONLINE} onClick={this.changeStaffState}> 在线</div>
                                <div className="menu-item" key={staffStateValues.LEAVE} onClick={this.changeStaffState}> 离开</div>
                                <div className="menu-item" key={staffStateValues.TRANSFER} onClick={this.changeStaffState}> 转接</div>
                                <div className="menu-item" key={staffStateValues.OFFLINE} onClick={this.changeStaffState}> 离线</div>
                            </div>
                        </Popup>

                        
                        <div className="menu-item"> 设置</div>
                        <Popup
                            trigger={<div className="menu-item">帮助<i className="fa fa-caret-right" style={arrowStyle(80)} aria-hidden="true"></i></div>}
                            position="right top"
                            on="click"
                            closeOnDocumentClick
                            mouseLeaveDelay={300}
                            mouseEnterDelay={0}
                            contentStyle={{ padding: "0px", border: "none", width: 150, backgroundColor: 'transparent', }}
                            arrow={false}
                        >
                            <div className="menu">
                                <div className="menu-item"  > 关于</div>
                              
                            </div>
                        </Popup>
                        <div className="menu-item" onClick={this.handleLogout}> 退出</div>
                    </div>


                </Popup>
            </div>);
    }
}


function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}


const page = connect(mapStateToProps)(Navibar);
export { page as Navibar }; 
