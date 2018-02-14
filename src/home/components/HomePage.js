import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../auth/actions';
import {Navbar} from './Navbar';

 

class HomePage extends Component {

    constructor(props) {
        super(props);
        // this.handleLogout = this.handleLogout.bind(this);
        // this.updateDimensions=this.updateDimensions.bind(this);

    }

    // updateDimensions() {
    //     this.setState({width: window.innerWidth/3});
    // } 
    // componentWillMount() {
    //     this.updateDimensions();
    // } 
    // componentDidMount() {
    //     window.addEventListener("resize", this.updateDimensions);
    //     const { dispatch } = this.props;
    //     dispatch(authActions.fetchState());
    // } 
    // componentWillUnmount() {
    //     window.removeEventListener("resize", this.updateDimensions);
    // }



    // componentDidUpdate() {
    //     const { isOnline, dispatch } = this.props;
    //     if (isOnline == false) {
    //         dispatch(authActions.logout());
    //     }
    // }

    // handleLogout() {
    //     const { dispatch } = this.props;
    //     dispatch(authActions.logout());
    // }



    render() {
        // if (this.props.user == null) {
        //     return (<div></div>);
        // }
        // else {
        //     const { userName, staffId } = this.props.user;

        //     const {width} =this.state;



        return (
            <div>
                <Navbar />
                <div>this is main view</div>
            </div>
        );

    }
}


function mapStateToProps(state) {

    return {};


}


const page = connect(mapStateToProps)(HomePage);
export { page as HomePage }; 