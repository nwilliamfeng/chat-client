import React, { Component } from 'react';
import { connect } from 'react-redux';
import SplitterLayout from 'react-splitter-layout';
import { Navbar } from './Navbar';
import { Statusbar } from './Statusbar';
import { CustomerList, StaffList } from '../../customers/components';

// const containerStyle = {
//     width: '100%',
//     top: 0,
//     left: 0,

//     position: 'absolute',
//     height: '100%',
// }

const containerStyle = {
    width: '100%',
    paddingTop: 50,
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
        this.state={customerListPaneSize:0,};
        this.onCustomerListPaneSizeChange =this.onCustomerListPaneSizeChange.bind(this);
    }

    onCustomerListPaneSizeChange(customerListPaneSize) {
        console.log(customerListPaneSize);   
        this.setState({ customerListPaneSize });     
       
     }

      

     /** 
      * 返回客户列表高度 
      */
    getCustomerListPaneHeight(){
        return window.innerHeight -  this.state.customerListPaneSize;
    }

    render() {
      
        return (
            <div>
                <Navbar />
                <div style={containerStyle}>
                    <SplitterLayout primaryIndex={1} secondaryInitialSize={480}   >
                        <SplitterLayout vertical secondaryInitialSize={450}   onSecondaryPaneSizeChange={this.onCustomerListPaneSizeChange}  >
                            <div style={{ height:this.getCustomerListPaneHeight(),padding:5}}>
                                <p style={leftTitleStyle}>客户列表</p>
                                <CustomerList style={{ height: '100%' }} />
                            </div>
                            <SplitterLayout secondaryInitialSize={240}>
                                <div>3rd</div>
                                <div>4th</div>
                            </SplitterLayout>
                        </SplitterLayout>
                        <div>1st</div>
                    </SplitterLayout>
                </div>
                {/* <div style={containerStyle}>
                    <div style={mainStyle}>this is main view</div>
                    <div style={leftStyle}>
                        <div style={{ height: '60%' }}>
                            <p style={leftTitleStyle}>客户列表</p>
                            <CustomerList  style={{ height: '100%'}}/>                           
                        </div>
                        <div style={{ height: '40%',paddingTop:50 }}>
                            <p style={leftTitleStyle}>客服列表</p> 
                            <StaffList style={{ height: '100%'}}/>                         
                        </div>
                    </div>
                </div> */}
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