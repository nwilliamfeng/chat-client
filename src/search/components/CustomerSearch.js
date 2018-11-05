import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withSearchBox } from '../../controls'
require('../../assets/styles/bootstrap-searchbox.css')

const getItems = () => {
    console.log('ddddd');
    return [
        { id: 'foo', label: '2foo' },
        { id: 'fwd', label: '2bar' },
        { id: 'foo2', label: '2baz' },
    ]
}


const SearchBox = withSearchBox()

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

    getCustomers = () => {
        console.log(this.props)
        const { relationMappingList } = this.props
        if (relationMappingList == null)
            return []
        return relationMappingList.map(x => { return { id: x.CustomerId, label: x.CustomerName } })
    }

    handleSelectItem = item => {
        console.log(item);
    }


    render() {
        return <SearchBox getMenuItems={this.getCustomers} onSelectItem={this.handleSelectItem} />
    }

}


function mapStateToProps(state) {
    const { relationMappingList } = state.customer
    return { relationMappingList }
}


const page = connect(mapStateToProps, null)(CustomerSearch);

/**
 * SearchBox实例
 */
export { page as CustomerSearch }; 
