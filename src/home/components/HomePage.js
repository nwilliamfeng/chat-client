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
import { Scrollbars } from 'react-custom-scrollbars';
import BackgroundImg from '../../assets/imgs/background.jpg';
require('../../assets/styles/grid.css');


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
        const a = [];
        for (var i = 0; i < 200; i++) {
            a.push(1);
        }

        return (
            // <SplitPane split='vertical' allowResize={false} pane1Style={navibarStyle}  defaultSize={60}  >
            //     <Navibar/>
            //     <ChatRegion/>
            // </SplitPane>
            // <div style={{ float: 'left', left: 0, right: 0, position: 'absolute' }}>

            //     <Navibar/>

            //     <div style={{ float: 'left',position:'fixed', left:60,overflow:'hidden',height:'calc(100%)'   }}>
            //            <ChatRegion />  

            //     </div>

            // </div>

            // <div className='row' style={{height:'100vh', overflowY:'hidden'}} >
            //     <div className='col-xs-1' style={{ background: 'red', height:'100%'  }}>
            //     </div>
            //     <div className='col-xs-2' style={{ background: 'yellow', height:'100%'   }}>
            //     </div>
            //     <div className='col-xs-9' style={{   background: 'green',  }}>
            //         <div style={{ maxHeight:'100vh',height:'100vh',  overflowY: 'auto', }} >
            //             {a.map((item) => (
            //                 <p>abc</p>
            //             ))}
            //         </div>
            //     </div>
            // </div>

            <div className='bg'>
            <div  style={{ left: 0, right: 0, height: '100vh',
            opacity:0.5
            ,backgroundImage:`url(${BackgroundImg})` 
            ,backgroundAttachment: 'fixed' ,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover' ,
            display: 'block',
            filter: 'blur(5px)'
            ,   float: 'left', position: 'absolute' }}>
                </div>
                <div className='container'  >
                    <div className="row">
                        <div className="col-fixed-left">
                            <Navibar />
                        </div>
                        {/* <div className="col-fixed-middle">
                            <div className="row" style={{ overflowX: 'hidden', height: '100vh', paddingLeft: 20, paddingRight: 20 }}>
                                <Scrollbars  >
                                    {a.map((item) => (
                                        <p>abc</p>
                                    ))}
                                </Scrollbars>
                            </div>
                        </div> */}
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