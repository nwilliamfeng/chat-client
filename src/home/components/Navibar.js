import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import Popup from "reactjs-popup";
require('../../assets/styles/react-split-pane.css');
require('../../assets/styles/button.css');


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

                {/* <button style={settingBtnStyle} className='metroBtn'><i className="fa fa-bars" aria-hidden="true"></i></button> */}
                <Popup
                    trigger={open => (
                        <button className="button">Trigger - {open ? "Opened" : "Closed"}</button>
                    )}
                    position="right center"
                    closeOnDocumentClick
                >
                    <span> popup content </span>
                </Popup>
            </div>

        );
    }

}

