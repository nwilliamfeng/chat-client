import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from "reactjs-popup";
import {homeActions} from '../actions'
import {StaffProfile} from './StaffProfile';
import {pageType} from '../constants';
import {PageHeader} from './PageHeader';
 
require('../../assets/styles/button.css');
require('../../assets/styles/menu.css');
require('../../assets/styles/nav_ul.css');

 

const settingBtnStyle = {
    padding: 20,
    paddingTop: 30,
    fontSize: 23
}

const navibarStyle = {
    height: '100%',
}

 

class Navibar extends Component {

    constructor(props) {
        super(props);
       this.state={selectPage:''};
       this.activatePage = this.activatePage.bind(this);
    }

    createNaviLi(fontIconName) {
        return (<li className='nav_li'> <i className={fontIconName} aria-hidden="false"></i>  </li>)
    }

    activatePage(page){
        this.setState({selectPage:page});
        const {dispatch} =this.props;
        dispatch(homeActions.changePage(page));
    }

    isSelectPage(page){
        const {selectPage} = this.state;
        return page===selectPage;
    }

    componentDidMount(){
        this.activatePage(pageType.CHAT);
    }

    render() {      
      
        return (
            <div style={navibarStyle}>
                <div style={{ width: '100%', height: 'calc(100% - 100px)' }}>
                    <StaffProfile/>
                    <ul className='nav_ul'>
                        {/* {this.createNaviLi('fa fa-comment-o')}
                        {this.createNaviLi('fa fa-user-o')}                      */}
                        {/* <li className='nav_li' onClick={this.activatePage(pageType.CHAT)} > <i className={this.isSelectPage(pageType.CHAT)?'fa fa-comment':'fa fa-comment-o'} aria-hidden="false"></i>  </li>
                        <li className='nav_li' onClick={this.activatePage(pageType.OTHER)}> <i className={this.isSelectPage(pageType.OTHER)?'fa fa-user':'fa fa-user-o'} aria-hidden="false"></i>  </li> */}
                        <PageHeader isSelect={this.isSelectPage(pageType.CHAT) }  page ={pageType.CHAT} onClick={this.activatePage}/>
                        <PageHeader isSelect={this.isSelectPage(pageType.OTHER) }  page ={pageType.OTHER} onClick={this.activatePage}/>
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
                        <div className="menu-item"> è®¾ç½®</div>
                        <div className="menu-item"> å¸®åŠ©</div>                                           
                    </div>

                </Popup>
            </div>);
    }
}


function mapStateToProps(state) {
    return state.home;
}


const page = connect(mapStateToProps)(Navibar);
export { page as Navibar }; 
