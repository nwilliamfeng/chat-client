import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from "reactjs-popup";
import { homeActions } from '../actions'
import { StaffProfile } from '../../staff/components';
import { pageType } from '../constants';
import { PageHeader } from './PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

require('../../assets/styles/button.css');
require('../../assets/styles/menu.css');
require('../../assets/styles/nav_ul.css');

const styles = {
    settingBtn: {
        padding: 20,
        paddingTop: 30,
        fontSize: 23
    },
    navibar: {
        height: '100%',
    },
    navbarTop: {
        width: '100%',
        height: 'calc(100% - 100px)'
    },
    navbarBottom: {
        padding: "0px",
        border: "none",
        width: 150,
        backgroundColor: 'transparent',
        marginTop: -20
    },

}

class Navibar extends Component {

    constructor(props) {
        super(props);
        this.state = { selectPage: '' };
        this.activatePage = this.activatePage.bind(this);
    }

   
    activatePage(page) {
        this.setState({ selectPage: page });
        const { dispatch } = this.props;
        dispatch(homeActions.changePage(page));
    }

    isSelectPage(page) {
        const { selectPage } = this.state;
        return page === selectPage;
    }

    componentDidMount() {
        this.activatePage(pageType.CHAT);
    }

    render() {

        return (
            <div style={styles.navibar}>
                <div style={styles.navbarTop}>
                    <StaffProfile/>
                    <ul className='nav_ul'>
                        <PageHeader isSelect={this.isSelectPage(pageType.CHAT)} page={pageType.CHAT} onClick={this.activatePage} />
                        <PageHeader isSelect={this.isSelectPage(pageType.OTHER)} page={pageType.OTHER} onClick={this.activatePage} />
                    </ul>
                </div>

                <Popup
                    trigger={() => (<button style={styles.settingBtn} title='更多' className='metroBtn'><FontAwesomeIcon icon={faBars} color='white'/></button>)}
                    position="right bottom" 
                    on="click"
                    closeOnDocumentClick
                    mouseLeaveDelay={300}
                    mouseEnterDelay={0}
                    contentStyle={styles.navbarBottom}
                    arrow={false} >
                    <div className="menu">
                        <div className="menu-item">帮助</div>
                        <div className="menu-item">设置</div>
                    </div>

                </Popup>
            </div>);
    }
}


function mapStateToProps(state) {
    return state.home;
}


const page = connect(mapStateToProps)(Navibar);

/**
 * 导航栏
 */
export { page as Navibar }; 
