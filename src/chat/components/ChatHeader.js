import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { dropdownButton } from '../../controls'

/**
 * 标题div
 */
const TitleDiv = styled.div`
    border-bottom:1px solid #E7E7E7;
    padding:16px 0px 6px 25px;
    height:61px;`

const MoreButton = styled.button`
     font-size: 14px;
     display: block;
     background-color: transparent;
     color: gray;
     border: none;
     outline: none;
     &:hover{
        color: green;
     };`

/**
 * 更多下拉框按钮
 */
const MoreDropdownButton = dropdownButton(props => <MoreButton {...props}><FontAwesomeIcon icon={faEllipsisH} /></MoreButton>)

class ChatHeader extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { selectedChat } = this.props;
        if (selectedChat == null && nextProps.selectedChat == null) {
            return false
        }
        if (selectedChat == null || nextProps.selectedChat == null) {
            return true
        }
        return !isEqual(nextProps.selectedChat.customer, selectedChat.customer) 
    }

    handleStickClick = () => {
        alert('stick')
    }

    handleHistoryClick = () => {
        alert('history')
    }

    getMenuItems = () => [{ title: '置顶', onClick: this.handleStickClick }, { title: '历史消息', onClick: this.handleHistoryClick }]

    render() {
        console.log('render chatHeader')
        const { selectedChat } = this.props
        return <div>
            {selectedChat && <TitleDiv>
                <div className='col-md-10' style={{ paddingLeft: 0 }}>
                    <p style={{ fontSize: 20 }}>{selectedChat.customer.CustomerName}</p>
                </div>
                <div className='col-md-2'>
                    <div className='pull-right'>
                        <MoreDropdownButton title='更多' menuItems={this.getMenuItems()} popOnLeft={true}/>
                    </div>
                </div>
            </TitleDiv>}
        </div>
    }
}

function mapStateToProps(state) {
    const { selectedChat } = state.chat
    return { selectedChat }
}


const page = connect(mapStateToProps, null)(ChatHeader)

/**
 * 聊天组件的台头
 */
export { page as ChatHeader }

