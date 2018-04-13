import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import Popup from "reactjs-popup";

require('../../assets/styles/button.css');
require('../../assets/styles/menu.css');

const settingBtnStyle = {
    //     display:'block',
    //    backgroundColor:'transparent',
    //     color:'white',
    //     border: 'none',
    //     outline:'none',
    padding: 20,
    paddingTop: 30,
    fontSize: 23
}

const navibarStyle = {
    height: '100%',
}


export default class Navibar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={navibarStyle}>
                <div style={{ width: '100%', height: 'calc(100% - 83px)' }}>
                </div>


                <Popup
                    trigger={open => (
                        <button style={settingBtnStyle} className='metroBtn'><i className="fa fa-bars" aria-hidden="true"></i></button>

                    )}
                    position="right bottom" on="click" closeOnDocumentClick
                    mouseLeaveDelay={300}
                    mouseEnterDelay={0}
                    contentStyle={{ padding: "0px", border: "none",width:150,backgroundColor:'transparent',marginTop:-20 }}
                    arrow={false}
                >

                    <div className="menu">
                       
                        <div className="menu-item"> item 4</div>
                        <div className="menu-item"> item 5</div>
                        <div className="menu-item"> item 6</div>
                    </div>


                </Popup>
            </div>

        );
    }

}

