import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navibar } from './Navibar'
import { pageType } from '../constants'
import BackgroundImg from '../../assets/imgs/background.jpg'
import { Chat, ChatList,HistoryMessagePane } from '../../chat/components'
import { CompositList, CustomerSearch } from '../../customers/components'
import styled from 'styled-components'
import Alert from 'react-s-alert'
import { withScroll, withSplit,withExtendPane } from '../../controls'
import { detailPaneType } from '../constants'
import {homeActions} from '../actions/homeActions'

/**
 * 背景板
 */
const Background = styled.div`
        left: 0px;
        right: 0px;
        height: 100vh;
        opacity: 0.5;
        z-index:-1;
        background-attachment:fixed;
        background-image:${props => `url(${props.img})`};
        background-repeat:no-repeat;
        background-size:cover;
        display:block;
        filter: blur(5px);
        float: left;
        position: fixed;`

/**
 * 列表区域
 */
const ListRegion = styled.div`
    background:#eee;  
    display:flex;
    height:100vh;
    flex-direction:column;`

/**
 * 列表容器
 */
const ListContainerDiv = styled.div`
    overflow:hidden;
    height:  100%  ;`


const ListContainer = withScroll(props => <div {...props} />)

/**
 * 导航栏容器
 */
const NavibarContainer = styled.div`
    width:60px;
    background:#2A2D32;`

/**
 * 搜索框容器
 */
const SearchBoxContainer = styled.div`
    display:flex;
    flex-direction:column;
    margin:14px 8px 6px 8px;`


const ExtendContainer = styled.div`
     width:100%;
    background:#F5F5F5; 
    padding-left:5px;
    padding-right:5px;  
    display:flex;
    flex-direction:column;
    color:gray;
    font-size:20px;   
    `

const HistoryMsgPane =withExtendPane(props=><HistoryMessagePane {...props}/>)

const MainContainer = styled.div`
    display:flex;
    z-index:1;
    justify-content:center;
    flex-direction:row;
    background: #F5F5F5;
    height:100vh;
    min-width:${props => props.detailPane ? '100%' : '70%'};
`

const ShellDiv = styled.div`display:flex;justify-content:center;`

const DetailDiv=styled.div`height:100%;`

const VerticalSplit = withSplit()


class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
        }
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    handleClosePane=()=>{
        const {dispatch} =this.props
        dispatch(homeActions.closeDetailPane())
    }


    render() {
        const { page, error, detailPane } = this.props
        // if (error != null) {
        //     Alert.success('Test message stackslide effect!', {
        //         position: 'top-right',
        //         effect: 'stackslide'
        //     })
        // }
        return <ShellDiv>
            <Background img={BackgroundImg} />
            <MainContainer detailPane={detailPane}>
                <NavibarContainer>
                    <Navibar />
                </NavibarContainer>
                <VerticalSplit size={241} minSize={241} maxSize={290}>
                    <ListRegion  >
                        <SearchBoxContainer>
                            <CustomerSearch />
                        </SearchBoxContainer>
                        <ListContainerDiv>
                            <ListContainer>
                                {page === pageType.CHAT && <ChatList />}
                                {page === pageType.CUSTOMER_LIST && <CompositList />}
                            </ListContainer>
                        </ListContainerDiv>
                    </ListRegion>                
                    <DetailDiv>
                        {detailPane == null && <VerticalSplit size={'100%'} minSize={150} >
                            <Chat />
                            <div />
                        </VerticalSplit>}
                        {detailPane === detailPaneType.HISTORY_MESSAGE && <VerticalSplit size={'50%'} minSize={150} >
                            <Chat />
                            <HistoryMsgPane onCloseHandle={this.handleClosePane}/>
                        </VerticalSplit>}
                    </DetailDiv>
                </VerticalSplit>
            </MainContainer>

            {/* <Alert stack={true} timeout={3000} /> */}
        </ShellDiv>
    }
}

function mapStateToProps(state) {
    const states = state.home
    const { error } = state.system
    return { ...states, error }
}

const page = connect(mapStateToProps)(HomePage)

/**
 * 主页
 */
export { page as HomePage }