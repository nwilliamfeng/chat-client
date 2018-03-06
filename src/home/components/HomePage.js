import React, { Component } from 'react';
import { connect } from 'react-redux';
import SplitterLayout from 'react-splitter-layout';
import { Navbar } from './Navbar';
import { Statusbar } from './Statusbar';
import { CustomerList, StaffList } from '../../customers/components';
import {CommonPhraseTreeView} from '../../configuration/components';


const containerStyle = {
    width: '100%',
    // paddingTop: 50,
    left: 0,
    fontSize: 12,
    position: 'absolute',
    //height: 'window.innerHeight - 50 - 28',
    height: '100%',
}


const leftTitleStyle = {
    fontWeight: 'Bold',
}

const customerListContianerStyle = {
    paddingLeft:5,
    paddingRight:5,
    paddingBottom:5,
    paddingTop: 55,
}

const staffListContianerStyle = {
    padding:5,
}

const commonPhraseContianerStyle = {
    padding:5,
}

class HomePage extends Component {

    constructor(props) {
        super(props);    
    }

    
    render() {

        return (
            <div>
                <Navbar />
                <div style={containerStyle}>

                    <SplitterLayout primaryIndex={1} secondaryInitialSize={480} primaryMinSize={400} secondaryMinSize={200}>
                        <SplitterLayout vertical secondaryInitialSize={50} primaryMinSize={10} secondaryMinSize={10} percentage>
                            <div style={customerListContianerStyle}>                              
                                <p style={leftTitleStyle}>客户列表</p>
                                <CustomerList />
                            </div>
                            <SplitterLayout secondaryInitialSize={60} primaryMinSize={10} secondaryMinSize={10} percentage>
                                <div style={staffListContianerStyle}>
                                    <p style={leftTitleStyle}>客服列表</p>
                                    <StaffList/>
                                </div>
                                <div style={commonPhraseContianerStyle}>
                                    <p style={leftTitleStyle}>常用语</p>
                                    <CommonPhraseTreeView/>
                                </div>
                            </SplitterLayout>
                        </SplitterLayout>
                        <div>1st</div>
                    </SplitterLayout>
                </div>
                <Statusbar />

            </div >
        );

    }
}


function mapStateToProps(state) {
    return {};
}


const page = connect(mapStateToProps)(HomePage);
export { page as HomePage }; 