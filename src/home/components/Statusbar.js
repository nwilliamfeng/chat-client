import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {HeartLoseStatusbarItem} from '../../auth/components';


class Statusbar extends Component {

    constructor(props) {
        super(props);
    }

     
 

    render() {
         
            return (
                
                    <nav className="navbar-nav-xs navbar-default navbar-fixed-bottom" >
                     
                            <ul className="nav navbar-nav" >
                                
                                <li><a href="#" >  info</a></li>
                                <li><a href="#" > info2</a></li>
                                <HeartLoseStatusbarItem />
                                <li><a href="#" className='pull-right'> info3</a></li>
                            </ul>
                        
                    </nav>
              
            );
        }
     
}


function mapStateToProps(state) {
    return {...state};
}


const page = connect(mapStateToProps)(Statusbar);
export { page as Statusbar }; 