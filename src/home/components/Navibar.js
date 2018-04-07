import React, { Component } from 'react';
import SplitPane from 'react-split-pane';

require('../../assets/styles/react-split-pane.css');
require('../../assets/styles/button.css');

const settingBtnStyle = {
    //     display:'block',
    //    backgroundColor:'transparent',
    //     color:'white',
    //     border: 'none',
    //     outline:'none',
    padding: 20,
     paddingTop:30,
    fontSize: 23
}

const navibarStyle = {
    background: '#2A2D32',

    left: 0,
    height: '100%',
    width: 60,
    float: 'left',
    position:'fixed', 
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
            
                    <button style={settingBtnStyle} className='metroBtn'><i className="fa fa-bars" aria-hidden="true"></i></button>
               
            </div>

        );
    }

}

