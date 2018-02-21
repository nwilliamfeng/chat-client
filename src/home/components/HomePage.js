import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Navbar } from './Navbar';
import { Statusbar } from './Statusbar';
import { CustomerList } from '../../customers/components';

const containerStyle = {
    width: '100%',
    top: 0,
    left: 0,

    position: 'absolute',
    height: '100%',
}

const leftStyle = {
    width: 500,
    background: '#f8f8f8',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 60,
    fontSize: 11,
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



class HomePage extends Component {

    constructor(props) {
        super(props);

    }





    render() {



        return (
            <div>
                <Navbar />
                <div style={containerStyle}>

                    <div style={mainStyle}>bbbb</div>
                    <div style={leftStyle}>
                        <p>客户列表</p>
                        <CustomerList />

                    </div>


                </div>
                <Statusbar />
                {/* <nav className="navbar-nav-xs navbar-default navbar-fixed-bottom"  >

                    <ul className="nav navbar-nav" >
                        <li><a href="#" ><i className="fa fa-refresh" aria-hidden="true"></i> adsf</a></li>
                        <li><a href="#"   ><i className="fa fa-calendar" aria-hidden="true"></i> gh</a></li>

                    </ul>
                </nav> */}
            </div>
        );

    }
}


function mapStateToProps(state) {

    return {};


}


const page = connect(mapStateToProps)(HomePage);
export { page as HomePage }; 