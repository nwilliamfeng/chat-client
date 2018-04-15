import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Titlebar } from './Titlebar';
import { Statusbar } from './Statusbar';
import {Navibar} from './Navibar'
import { CustomerList, StaffList } from '../../customers/components';
import { CommonPhraseTreeView } from '../../configuration/components';
import { Chat } from '../../chat/components';
import { homeActions } from '../actions';
import SplitPane from 'react-split-pane';
import { ChatRegion } from './ChatRegion'
import { Scrollbars } from 'react-custom-scrollbars';
import BackgroundImg from '../../assets/imgs/background.jpg';
require('../../assets/styles/grid.css');

/**
 * 背景样式
 */
const bgStyle={
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
        return (          
            <div>
                <div style={bgStyle}></div>              
                <div className='container'  >
                    <div className="row">
                        <div className="col-fixed-left">
                            <Navibar />
                        </div>

                        <div className="col-md-12 col-offset-main">
                            <ChatRegion />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


function mapStateToProps(state) {
    return state;
}


const page = connect(mapStateToProps)(HomePage);
export { page as HomePage }; 