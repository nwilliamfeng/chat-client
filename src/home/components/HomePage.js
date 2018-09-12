import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navibar } from './Navibar';
import { pageType } from '../constants';
import { SearchBox } from '../../search/components';
import BackgroundImg from '../../assets/imgs/background.jpg';
import { ChatPage, ChatList } from '../../chat/components';
import { CompositList } from '../../customers/components';
require('../../assets/styles/grid.css');
require('../../assets/styles/ul.css');
require('../../assets/styles/scrollbar.css');


const styles = {
    //主页背景样式
    bg: {
        left: 0,
        right: 0,
        height: '100vh',
        opacity: 0.5,
        backgroundImage: `url(${BackgroundImg})`,
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'block',
        filter: 'blur(5px)',
        float: 'left',
        position: 'absolute',
    },

    //列表div样式
    listDiv: {
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },

    //查询框div样式
    searchBoxDiv: {
        marginLeft: 20,
        marginTop: 20,
        marginRight: 3,
    },
    //列表容器样式
    listContainer: {
        height: 'calc(100% - 72px )',//搜索框距离

        position: 'absolute',
        paddingLeft: 10,
        width: 'calc(100% - 7px)'
    },
}



class HomePage extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const { page } = this.props;
        return (
            <div>
                <div style={styles.bg}></div>
                <div className="row">
                    <div className="col-fixed-left">
                        <Navibar />
                    </div>
                    <div className="col-md-12 col-offset-main">
                        <div className="row">
                            <div className="col-fixed-chatlist">
                                <div style={styles.listDiv}>
                                    <div style={styles.searchBoxDiv}>
                                        <SearchBox />
                                    </div>

                                    <div style={styles.listContainer} className='scollContainer'>
                                        {page === pageType.CHAT && <ChatList />}
                                        {page === pageType.CUSTOMER_LIST && <CompositList />}
                                    </div>

                                </div>
                            </div>

                            <div className="col-offset-chat">
                                <div className="innerHold-chat" >
                                    <ChatPage />
                                </div>
                                <div className="innerHold-extend" style={{ background: 'pink', height: '100vh' }}  >
                                    {/* <div style={customerDivStyle}>
                                        <p style={titleStyle}>客户列表</p>
                                        <CustomerList />
                                    </div>
                                    <div style={staffDivStyle}>
                                        <p style={titleStyle}>客服列表</p>
                                        <StaffList />
                                    </div> */}
                                </div>

                                <div className="clear"></div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>

        );
    }
}


function mapStateToProps(state) {
    return state.home;
}


const page = connect(mapStateToProps)(HomePage);

/**
 * 主页
 */
export { page as HomePage }; 