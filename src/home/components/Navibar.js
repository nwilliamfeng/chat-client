import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchBox } from '../../search/components';
import {ChatList} from '../../chat/components';
require('../../assets/styles/nav-pill.css');

const containerStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
}
 
 
export default class Navibar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SearchBox />
                <ul className="nav nav-pills nav-pills-xs">
                    <li role="presentation" className="active"><a href="#">在线客服</a></li>
                    <li role="presentation"><a href="#">其他1</a></li>
                    <li role="presentation"><a href="#">其他2</a></li>
                </ul>
                <div style={containerStyle}>
                   <ChatList/>
                </div>
            </div>
        );
    }

}

