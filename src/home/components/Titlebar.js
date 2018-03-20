import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StaffMenu } from '../../auth/components';


class Titlebar extends Component {

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
        //const { dispatch } = this.props;
        // dispatch(authActions.fetchState());
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }



    componentDidUpdate() {

    }


    render() {

        const { width } = this.state;

        return (
            <div className="container-fluid">
                <nav className="navbar navbar-default navbar-fixed-top" >
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand">IM在线客服</a>
                        </div>
                        <ul className="nav navbar-nav navbar-right" >

                            <li><a><i className="fa fa-refresh" aria-hidden="true"></i> 刷新</a></li>
                            <li><a style={{ marginRight: width }}><i className="fa fa-calendar" aria-hidden="true"></i> 历史</a></li>
                            <StaffMenu />

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


const page = connect(mapStateToProps)(Titlebar);
export { page as Titlebar }; 