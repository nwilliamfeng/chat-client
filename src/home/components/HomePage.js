import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navibar } from './Navibar'
import { pageType } from '../constants'
import BackgroundImg from '../../assets/imgs/background.jpg'
import { Chat, ChatList } from '../../chat/components'
import { CompositList, CustomerSearch } from '../../customers/components'
import styled from 'styled-components'
import Alert from 'react-s-alert'
import { withScroll, withSplit, ExpandPanel } from '../../controls'

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
    margin:14px 5px 6px 10px;`


const ExtendContainer = styled.div`
     width:100%;
    background:#F5F5F5; 
    padding-left:5px;
    padding-right:5px;  
    align-items: center; 
    color:gray;
    font-size:20px;
    justify-content: center;
    `

const MainContainer = styled.div`
    display:flex;
    z-index:1;
    flex-direction:row;
    background: #F5F5F5;
    height:100vh;
`

const VerticalSplit = withSplit()

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
            size: '50%', isResizing: false
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



    onResizeStart = () => this.setState({ isResizing: true })
    onResizeEnd = () => this.setState({ isResizing: false })
    onChange = size => this.setState({ size })

    render() {
        const { page, error } = this.props

        // if (error != null) {
        //     Alert.success('Test message stackslide effect!', {
        //         position: 'top-right',
        //         effect: 'stackslide'
        //     })
        // }
        return <React.Fragment>
            <Background img={BackgroundImg} />
            <MainContainer>
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


                    <VerticalSplit size={'50%'} minSize={150}>
                        <Chat />
                        <ExtendContainer>{'扩展面板'}</ExtendContainer>
                    </VerticalSplit>
                </VerticalSplit>


            </MainContainer>

            {/* <Alert stack={true} timeout={3000} /> */}
        </React.Fragment>
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