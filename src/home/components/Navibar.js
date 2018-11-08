import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { homeActions } from '../actions'
import { StaffProfile } from '../../staff/components'
import { pageType } from '../constants'
import { PageHeader } from './PageHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {dropdownButton} from '../../controls'

const Container = styled.div`
    display:flex;
    height:100%;
    flex-direction:column;
    align-content:center;
    justify-content: space-between;`

const ContainerTop = styled.div` 
   
    `

const Button = styled.button`
     padding: 0px;
     margin: 0px 20px 10px 20px;
     font-size: 23px;
     display: block;
     background-color: transparent;
     color: rgb(230, 224, 224);
     border: none;
     outline: none;
     &:hover{
        color: white;
     };
`;

const SettingButton= dropdownButton(props=><Button {...props}><FontAwesomeIcon icon={faBars}/></Button>)

const NavUl = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: auto;
`;

class Navibar extends Component {

    constructor(props) {
        super(props);
    }

    activatePage = page => {
        const { dispatch } = this.props;
        dispatch(homeActions.changePage(page));
    }

    isSelectPage = p => {
        const { page } = this.props;
        return p === page;
    }

    componentDidMount() {
        this.activatePage(pageType.CHAT);
    }

    handleHelpClick = () => {
        alert('help');
    }

    handleSettingClick = () => {
        alert('setting');
    }

    getMenuItems = () => [{ title: '帮助', onClick: this.handleHelpClick }, { title: '设置', onClick: this.handleSettingClick }]


    render() {
        return (
            <Container>
                <ContainerTop>
                    <StaffProfile />
                    <NavUl>
                        <PageHeader isSelect={this.isSelectPage(pageType.CHAT)} page={pageType.CHAT} onClick={this.activatePage} />
                        <PageHeader isSelect={this.isSelectPage(pageType.CUSTOMER_LIST)} page={pageType.CUSTOMER_LIST} onClick={this.activatePage} />
                    </NavUl>
                </ContainerTop>
                <SettingButton popOnTop={true} vOffset={-10} menuItems={this.getMenuItems()} title='更多'/>             
            </Container>);
    }
}


function mapStateToProps(state) {
    return state.home;
}

const page = connect(mapStateToProps)(Navibar);

/**
 * 导航栏
 */
export { page as Navibar }; 
