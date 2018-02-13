import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../auth/actions';

  

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.updateDimensions=this.updateDimensions.bind(this);

    }

    updateDimensions() {
        this.setState({width: window.innerWidth/3});
    } 
    componentWillMount() {
        this.updateDimensions();
    } 
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        const { dispatch } = this.props;
        dispatch(authActions.fetchState());
    } 
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

   

    componentDidUpdate() {
        const { isOnline, dispatch } = this.props;
        if (isOnline == false) {
            dispatch(authActions.logout());
        }
    }

    handleLogout() {
        const { dispatch } = this.props;
        dispatch(authActions.logout());
    }



    render() {
        if (this.props.user == null) {
            return (<div></div>);
        }
        else {
            const { userName, staffId } = this.props.user;
          
            const {width} =this.state;
            
      
        
            return (
                <div className="container-fluid">
                    <nav className="navbar navbar-default navbar-fixed-top" >
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="#">IM在线客服</a>
                            </div>
                         
                            <ul className="nav navbar-nav navbar-right" >
                                <li><a href="#" ><span className="glyphicon glyphicon-user"></span> 注册</a></li>
                                <li><a href="#"  onClick={this.handleLogout} style={{marginRight:width}}><span className="glyphicon glyphicon-log-in"></span> 退出</a></li>
                                <li className="dropdown" >
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <span className="glyphicon glyphicon-user"></span>  {userName}({staffId})<b className="caret"></b>
                                    </a>
                                    <ul className="dropdown-menu" >
                                        <li><a href="#">jmeter</a></li>
                                        <li><a href="#">EJB</a></li>
                                        <li><a href="#">Jasper Report</a></li>
                                        <li className="divider"></li>
                                        <li><a href="#">分离的链接</a></li>
                                        <li className="divider"></li>
                                        <li><a href="#" onClick={this.handleLogout}><span className="glyphicon glyphicon-log-in"></span> 退出</a></li>
                                    </ul>
                                </li>

                            </ul>
                        </div>
                    </nav>
                </div>
            );
        }
    }
}


function mapStateToProps(state) {

    console.log(state);
    return state.auth;


}


const page = connect(mapStateToProps)(Navbar);
export { page as Navbar }; 