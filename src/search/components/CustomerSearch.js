import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withSearchBox} from '../../controls'
require('../../assets/styles/bootstrap-searchbox.css')

 
const getItems=()=>{
    console.log('ddddd');
    return [
    { id: 'foo', label: '2foo' },
    { id: 'fwd', label: '2bar' },
    { id: 'foo2', label: '2baz' },
]
}




const SearchBox=withSearchBox()

/** 
 * 搜索框组件 
 */
class CustomerSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }


    render() {

        return  <SearchBox getMenuItems={getItems} searchByReturn={true}/>
    }

}


function mapStateToProps(state) {
    return {};
}


const page = connect(mapStateToProps, null)(CustomerSearch);

/**
 * SearchBox实例
 */
export { page as CustomerSearch }; 
