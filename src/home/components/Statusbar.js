import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeartLoseStatusbarItem } from '../../auth/components';


class Statusbar extends Component {

    

    render() {
        return (
            <nav className="navbar-nav-xs navbar-default navbar-fixed-bottom" >
                <ul className="nav navbar-nav" >
                    <li><a   >  info</a></li>
                    <li><a   > info2</a></li>
                    <HeartLoseStatusbarItem />
                    <li><a   className='pull-right'> info3</a></li>
                </ul>

            </nav>
        );
    }

}


function mapStateToProps(state) {
    // return {...state}; //注意这里暂时返回state所有的字段，
    const { reconnectCount } = state;
    return { reconnectCount };
}


const page = connect(mapStateToProps)(Statusbar);
export { page as Statusbar }; 