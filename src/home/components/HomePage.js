import React, { Component } from 'react';
import { connect } from 'react-redux';
import SplitterLayout from 'react-splitter-layout';
import { Navbar } from './Navbar';
import { Statusbar } from './Statusbar';
import { CustomerList, StaffList } from '../../customers/components';



const containerStyle = {
    width: '100%',
    paddingTop: 50,
    left: 0,
    fontSize: 12,
    position: 'absolute',
    height: window.innerHeight - 50 - 28,
}


const leftTitleStyle = {
    fontWeight: 'Bold',
}

const leftContianerStyle = {
    padding: 5,
}


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = { customerListPaneSize: 0, };
        this.onCustomerListPaneSizeChange = this.onCustomerListPaneSizeChange.bind(this);
    }

    onCustomerListPaneSizeChange(customerListPaneSize) {
        console.log(customerListPaneSize);
        this.setState({ customerListPaneSize });

    }



    /** 
     * 返回客户列表高度 
     */
    getCustomerListPaneHeight() {
        return window.innerHeight * (1 - this.state.customerListPaneSize / 100);
    }

    render() {

        return (
            <div>
                <Navbar />
                <div style={containerStyle}>
                    <SplitterLayout primaryIndex={1} secondaryInitialSize={480} primaryMinSize={400} secondaryMinSize={200}>
                        <SplitterLayout vertical secondaryInitialSize={50} primaryMinSize={10} secondaryMinSize={10} percentage>
                            <div style={leftContianerStyle}>
                                <p style={leftTitleStyle}>客户列表</p>
                                <CustomerList />
                            </div>
                            <SplitterLayout secondaryInitialSize={240} primaryMinSize={60} secondaryMinSize={60}>
                                <div style={leftContianerStyle}>
                                    <p style={leftTitleStyle}>客服列表</p>
                                    <StaffList />
                                </div>
                                <div>4th</div>
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