import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
require('../../assets/styles/bootstrap-searchbox.css');

const iconStyle={
    cursor:'default',
    color:'grey',
    marginTop:-3,
}

/** 
 * 搜索框组件 
 */
 class SearchBox extends Component {

    constructor(props) {
        super(props);

    }






    render() {

        return (

            <div>
                {/* <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search for..." />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button">Go!</button>
                    </span>
                </div> */}
                 
                   <div className="form-group  right-inner-addon">
                       <i className="fa fa-search" aria-hidden="true" style={iconStyle}></i>
                       <input type="search" className="form-control input-xs" placeholder="联系人" style={{height:28}}/>                      
                   </div>    
                   
            </div>

        );
    }

}


function mapStateToProps(state) {
    return {};
}


const page = connect(mapStateToProps, null)(SearchBox);

/**
 * SearchBox实例
 */
export { page as SearchBox }; 
