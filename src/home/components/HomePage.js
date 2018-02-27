import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navbar } from './Navbar';
import { Statusbar } from './Statusbar';
import { CustomerList,StaffList } from '../../customers/components';

const containerStyle = {
    width: '100%',
    top: 0,
    left: 0,

    position: 'absolute',
    height: '100%',
}

const leftStyle = {
    width: 500,
   // background: '#f8f8f8',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 60,
    fontSize: 13,
    position: 'absolute',
    height: '100%',
};

const mainStyle = {
    width: '100%',
    paddingLeft: 510,
    paddingTop: 60,
    position: 'absolute',
    height: '100%',
}

const leftTitleStyle = {
    fontWeight: 'Bold',
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
                    <div style={mainStyle}>this is main view</div>
                    <div style={leftStyle}>
                        <div style={{ height: '60%' }}>
                            <p style={leftTitleStyle}>客户列表</p>
                            <CustomerList  style={{ height: '100%'}}/>                           
                        </div>
                        <div style={{ height: '40%',paddingTop:50 }}>
                            <p style={leftTitleStyle}>????</p> 
                            <StaffList style={{ height: '100%'}}/>                         
                        </div>
                    </div>
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