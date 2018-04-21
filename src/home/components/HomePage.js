import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Navibar } from './Navibar'
import { homeActions } from '../actions';
import { pageType } from '../constants';
import { ChatPage } from '../../chat/components'
import UnimplementPage from './UnimplementPage'
import BackgroundImg from '../../assets/imgs/background.jpg';
require('../../assets/styles/grid.css');

/**
 * 背景样式
 */
const bgStyle = {
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
    position: 'absolute'
}


class HomePage extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const { page } = this.props;
        return (
            <div >
                <div style={bgStyle}></div>
                 
                    <div className="row">
                        <div className="col-fixed-left">
                            <Navibar />
                        </div>

                        <div className="col-md-12 col-offset-main">
                            {page === pageType.CHAT ? (
                                <ChatPage />
                            ) : page === pageType.OTHER ? (
                                <UnimplementPage />
                            ) : null}

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
export { page as HomePage }; 