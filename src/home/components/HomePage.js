import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navibar } from './Navibar'
import { pageType } from '../constants'
import BackgroundImg from '../../assets/imgs/background.jpg'
import { Chat, ChatList } from '../../chat/components'
import { CompositList, CustomerSearch } from '../../customers/components'
import styled from 'styled-components'
import Alert from 'react-s-alert'
import { withScroll } from '../../controls'
import Draggable from 'react-draggable';

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
    max-width:240px;
    display:flex;
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

const OutSpliterDiv = styled.div`
 width:8px;
 height:100%;
 background-color:transparent;
 flex-direction:row;
 align-content:center;
 justify-content:center;
 display:flex;
`

const InnerSpliterDiv = styled.div`
 width:1px;
 height:100%;
 background:lightgray;
`

const Spliter = (props) => <OutSpliterDiv {...props}><InnerSpliterDiv /> </OutSpliterDiv>


/**
 * 搜索框容器
 */
const SearchBoxContainer = styled.div`
   margin:12px 5px 5px 10px;`

// const ChatContainer = styled.div`
//     flex:0 1 auto;
//     width:${props=>`1200px - ${props.offset}px)`}
//     background-color:#F5F5F5;`

const ChatContainer = styled.div`
 
    width:${props => `${props.offset}px`};
    background-color:#F5F5F5;`


const ExtendContainer = styled.div`
     width:300px;
    display:flex;
    background:#F5F5F5; 
    padding-left:5px;
    padding-right:5px;  
    align-items: center; 
    color:gray;
    font-size:20px;
    justify-content: center;
    border-left: lightgray solid 1px;
    `

const MainContainer = styled.div`
    display:flex;
    z-index:1;
    flex-direction:row;
    background: #F5F5F5;
    height:100vh;
`

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
            chatRegionWidth: 600,
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

    handleDrag = (e, data) => {
         //  console.log('Data: ', data);
        const { chatRegionWidth } = this.state
         this.setState({ chatRegionWidth: chatRegionWidth + data.deltaX })
    };

    render() {
        const { page, error } = this.props
        const { chatRegionWidth } = this.state
     //   console.log('render:' + chatRegionWidth);
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
                <ChatContainer offset={chatRegionWidth}>
                    <Chat />
                </ChatContainer>
                <Draggable
                    axis="x"

                    onStart={this.handleStart}
                    onDrag={this.handleDrag}
                    onStop={this.handleStop}>
                    <Spliter>

                    </Spliter>
                </Draggable>
                <ExtendContainer>{'扩展面板'}</ExtendContainer>
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