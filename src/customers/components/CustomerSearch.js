import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withSearchBox } from '../../controls'
import { customerActions } from '../actions'
import { chatActions } from '../../chat/actions'
import { appContext } from '../../util'
import Rx from 'rx'
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

    componentDidMount() {
        if (appContext.currentStaff != null) {
            this.loadCustomers()
            this.subscribeRelationMappingList()
        }
    }

    loadCustomers = () => {
        if (appContext.currentStaff != null) {
            const { dispatch } = this.props
            dispatch(customerActions.fetchCustomerRelationMappingList())
        }
    }

    componentWillUnmount() {
        this.subscription.dispose()
    }

    subscribeRelationMappingList = () => {
        const source = Rx.Observable
            .interval(5000 /* ms */)
            .timeInterval()
        this.subscription = source.subscribe(
            () => {
                this.loadCustomers();
                if (appContext.currentStaff == null) {
                    this.subscription.dispose()
                }
            },
            (err) => {
                console.log('Error: ' + err)
            },
            () => {
                console.log('Completed')
            })
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
