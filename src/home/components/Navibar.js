import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Popup from "reactjs-popup";
import { homeActions } from '../actions'
import { StaffProfile } from '../../staff/components';
import { pageType } from '../constants';
import { PageHeader } from './PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';




const popupContentStyle = {
    padding: "0px",
    border: "none",
    width: 150,
    backgroundColor: 'transparent',
    marginTop: -20
};


const Container = styled.div`height: 100%; `;

const ContainerTop = styled.div` 
    width: 100%;
    height: calc(100% - 100px);
`;


const SettingButton = styled.button`
     padding: 20px;
     padding-top: 30px;
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

const NavUl = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: auto;
`;

const SettingMenu = styled.div`
    width: 150px;
    
    display: flex;
    flex-direction: column;
    background: #2A2A2A;
    color: gray;
`;

const SettingMenuItem = styled.div`  
    cursor: pointer;
    padding-left: 25px;
    padding-top: 10px;
    padding-bottom: 10px;
     
    &:hover {   
        background: #2F3134;
    }

`;


class Navibar extends Component {

    constructor(props) {
        super(props);
        this.state = { selectPage: '' };
        this.activatePage = this.activatePage.bind(this);
    }


    activatePage(page) {
        this.setState({ selectPage: page });
        const { dispatch } = this.props;
        dispatch(homeActions.changePage(page));
    }

    isSelectPage(page) {
        const { selectPage } = this.state;
        return page === selectPage;
    }

    componentDidMount() {
        this.activatePage(pageType.CHAT);
    }

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

                <Popup
                    trigger={() => (<SettingButton title='更多'><FontAwesomeIcon icon={faBars} /></SettingButton>)}
                    position="right bottom"
                    on="click"
                    closeOnDocumentClick
                    mouseLeaveDelay={300}
                    mouseEnterDelay={0}
                    contentStyle={popupContentStyle}
                    arrow={false} >
                    <SettingMenu>
                        <SettingMenuItem>帮助</SettingMenuItem>
                        <SettingMenuItem>设置</SettingMenuItem>
                    </SettingMenu>

                </Popup>
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
