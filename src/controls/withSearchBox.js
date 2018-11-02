import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import ReactAutocomplete from 'react-autocomplete'
require('../assets/styles/bootstrap-searchbox.css')

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


const DefaultSearchInput = props => <div className="form-group  right-inner-addon">
    <SearchIcon aria-hidden="true"  ><FontAwesomeIcon icon={faSearch} /></SearchIcon>
    <input type="search" className="form-control input-xs" placeholder="联系人" style={{ height: 28 }} {...props} />
</div>

const DefaultMenuItem=(item, highlighted) =><MenuItemDiv
    key={item.id}
    highlighted={highlighted}
>
    {item.label}
</MenuItemDiv>

const MenuItemDiv = styled.div`
 background-color:${props=>props.highlighted?'#eee':'transparent'};
 padding:5px;
`
const items = [
    { id: 'foo', label: '2foo' },
    { id: 'bar', label: '2bar' },
    { id: 'baz', label: '2baz' },
];

export const withSearchBox = (Input, MenuItem) => class extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
        }
    }


    render() {
        const { getMenuItems } = this.props
        return <div >
            <ReactAutocomplete
                items={getMenuItems()}
                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.label}
                renderItem={ MenuItem?MenuItem:DefaultMenuItem
                }
                renderInput={Input ? Input : DefaultSearchInput}
                menuStyle={menuStyle}
                value={this.state.value}
                onChange={e => this.setState({ value: e.target.value })}
                onSelect={value => this.setState({ value })}
            />
        </div>
    }

}

