import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchBox } from '../../search/components';
import { ChatList } from '../../chat/components';
require('../../assets/styles/nav-pill.css');

const containerStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 0,
}

const containerStyle2 = {
    paddingTop: 0,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
}


export default class Navibar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div style={containerStyle}>
                    <SearchBox />
                </div>

                {/* <ul className="nav nav-pills nav-pills-xs" style={containerStyle2}>
                    <li role="presentation" className="active"><a href="#">在线客服</a></li>
                    <li role="presentation"><a href="#">其他1</a></li>
                    <li role="presentation"><a href="#">其他2</a></li>
                </ul> */}
                {/* <div className="btn-group" role="group" aria-label="...">
                    <button type="button" className="btn btn-default"><i className="fa fa-weixin" aria-hidden="true"></i></button>
                    <button type="button" className="btn btn-default"><i className="fa fa-weixin" aria-hidden="true"></i></button>
                    <button type="button" className="btn btn-default"><i className="fa fa-weixin" aria-hidden="true"></i></button>
                </div> */}
                <div  >
                    <ChatList />
                </div>
            </div>
        );
    }

}

