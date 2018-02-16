import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../auth/actions';
import {StaffMenu} from '../../auth/components';


class Navbar extends Component {

    constructor(props) {
        super(props);
      
        this.updateDimensions = this.updateDimensions.bind(this);

    }

    updateDimensions() {
        this.setState({ width: window.innerWidth / 3 });
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
       ??? if (isOnline == false) {
           // dispatch(authActions.logout());
        }
    }

    

    /*
     https://fontawesome.com/v4.7.0/icon/refresh/
    */

    // render() {
    //     if (this.props.user == null) {
    //         return (<div></div>);
    //     }
    //     else {
    //         const { userName, staffId } = this.props.user;

    //         const { width } = this.state;



    //         return (
    //             <div className="container-fluid">
    //                 <nav className="navbar navbar-default navbar-fixed-top" >
    //                     <div className="container-fluid">
    //                         <div className="navbar-header">
    //                             <a className="navbar-brand" href="#">IM在线客服</a>
    //                         </div>

    //                         <ul className="nav navbar-nav navbar-right" >
    //                             <li><a href="#" ><i className="fa fa-refresh" aria-hidden="true"></i> 注册</a></li>
    //                             <li><a href="#" onClick={this.handleLogout} style={{ marginRight: width }}><i className="fa fa-calendar" aria-hidden="true"></i> 历史</a></li>
    //                             <li className="dropdown" >
    //                                 <a href="#" className="dropdown-toggle" data-toggle="dropdown">
    //                                     <span className="glyphicon glyphicon-user"></span>  {userName}({staffId})<b className="caret"></b>
    //                                 </a>
    //                                 <ul className="dropdown-menu" >
                                      
                                       
    //                                     <li className="menu-item dropdown dropdown-submenu left-submenu">
    //                                         <a href="#" className="dropdown-toggle" data-toggle="dropdown">更改状态</a>
    //                                         <ul className="dropdown-menu">
    //                                             <li> <a href="#">在线</a></li>
    //                                             <li> <a href="#">离开</a></li>
    //                                             <li> <a href="#">转接</a></li>
    //                                         </ul>
    //                                     </li>
    //                                     <li className="divider"></li>
    //                                     <li><a href="#">设置</a></li>
    //                                     <li className="divider"></li>
    //                                     <li><a href="#" onClick={this.handleLogout}><span className="glyphicon glyphicon-log-in"></span> 退出</a></li>
    //                                 </ul>
    //                             </li>

    //                         </ul>
    //                     </div>
    //                 </nav>
    //             </div>
    //         );
    //     }
    // }

    render() {
         
            const { width } = this.state;

            return (
                <div className="container-fluid">
                    <nav className="navbar navbar-default navbar-fixed-top" >
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="#">IM在线客服</a>
                            </div>

                            <ul className="nav navbar-nav navbar-right" >
                                <li><a href="#" ><i className="fa fa-refresh" aria-hidden="true"></i> 注册</a></li>
                                <li><a href="#"   style={{ marginRight: width }}><i className="fa fa-calendar" aria-hidden="true"></i> 历史</a></li>
                                <StaffMenu/>

                            </ul>
                        </div>
                    </nav>
                </div>
            );
        }
     
}


function mapStateToProps(state) {

    return {};

}


const page = connect(mapStateToProps)(Navbar);
export { page as Navbar }; 