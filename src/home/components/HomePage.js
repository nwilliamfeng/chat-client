import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Titlebar } from './Titlebar';
import { Statusbar } from './Statusbar';
import Navibar from './Navibar'
import { CustomerList, StaffList } from '../../customers/components';
import { CommonPhraseTreeView } from '../../configuration/components';
import { Chat } from '../../chat/components';
import { homeActions } from '../actions';
import SplitPane from 'react-split-pane';
import { ChatRegion } from './ChatRegion'
require('../../assets/styles/react-split-pane.css');


const navibarStyle = {
    background: '#2A2D32',

    left: 0,
    height: '100vh',
    width: 60,
    float: 'left',

}

class HomePage extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            // <SplitPane split='vertical' allowResize={false} pane1Style={navibarStyle}  defaultSize={60}  >
            //     <Navibar/>
            //     <ChatRegion/>
            // </SplitPane>
            <div style={{ float: 'left', left: 0, right: 0, position: 'absolute' }}>
                
                <Navibar/>
                    {/* <div style={{background:'green' ,width:'100%',height:'calc(100% - 60px)'}}>
                    </div>
                    <div>
                        <p style={{color:'red'}}>32</p>
                    </div> */}
                
                <div style={{ float: 'left',position:'fixed', left:60, background:'red' ,overflow:'hidden',height:'calc(100%)'   }}>
                       <ChatRegion />  
                        
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