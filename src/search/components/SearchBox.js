import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ReactAutocomplete from 'react-autocomplete'
require('../../assets/styles/bootstrap-searchbox.css')

const SearchIcon = styled.i`
    color: gray;
    margin-top: -5px;`

/**
 * 菜单样式
 */
const menuStyle = {
    zIndex: 1000, //这里必须把zIndex置为大的值
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 0',
    position: 'fixed',
    overflow: 'auto',
    maxHeight: '50%',
}


const renderSearchInput = props => <div className="form-group  right-inner-addon">
    <SearchIcon aria-hidden="true"  ><FontAwesomeIcon icon={faSearch} /></SearchIcon>
    <input type="search" className="form-control input-xs" placeholder="联系人" style={{ height: 28 }} {...props} />
</div>

const DIV=styled.div``


/** 
 * 搜索框组件 
 */
class SearchBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }


    render() {

        return <div >
            <ReactAutocomplete
                items={[
                    { id: 'foo', label: '2foo' },
                    { id: 'bar', label: '2bar' },
                    { id: 'baz', label: '2baz' },
                ]}
                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.label}
                renderItem={(item, highlighted) =>
                    <DIV
                        key={item.id}
                        style={{ backgroundColor: highlighted ? '#eee' : 'white', padding: 5 }}
                    >
                        {item.label}
                    </DIV>
                }
                renderInput={renderSearchInput}
                menuStyle={menuStyle}
                value={this.state.value}
                onChange={e => this.setState({ value: e.target.value })}
                onSelect={value => this.setState({ value })}
            />
        </div>
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
