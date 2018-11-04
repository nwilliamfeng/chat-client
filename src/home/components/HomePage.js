import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navibar } from './Navibar'
import { pageType } from '../constants'
import { CustomerSearch } from '../../search/components'
import BackgroundImg from '../../assets/imgs/background.jpg'
import { Chat, ChatList } from '../../chat/components'
import { CompositList } from '../../customers/components'
import styled from 'styled-components'
import Alert from 'react-s-alert'
import { withScroll } from '../../controls'
import sizeMe from 'react-sizeme'

 

/**
 * 背景板
 */
const Background = styled.div`
        left: 0px;
        right: 0px;
        height: 100vh;
        opacity: 0.5;
        background-attachment:fixed;
        background-image:${props => `url(${props.img})`};
        background-repeat:no-repeat;
        background-size:cover;
        display:block;
        filter: blur(5px);
        float: left;
        position: absolute; `

/**
 * 列表区域
 */
const ListRegion = styled.div`
    width:250px;
    background:#E6E6E7;
    position:fixed;
    height:100%;
    z-index:2;
    padding:5px 0px 0px 5px;`



/**
 * 列表容器
 */
const ListContainerDiv = styled.div`
    height: calc(100% - 56px);  
    padding-left: 10px;`

const ListContainer = withScroll(props => <div {...props} />)

const ListContainerDivWithAutoSize = sizeMe({ monitorHeight: true })(props => <ListContainerDiv {...props} />)





/**
 * 导航栏容器
 */
const NavibarContainer = styled.div`
    width:60px;
    background:#2A2D32;
    position:fixed;
    height:100%;
    z-index:2;`

/**
 * 搜索框容器
 */
const SearchBoxContainer = styled.div`
   margin:12px 5px 0px 20px;`

const DetailContainer = styled.div`
    padding-left:250px;
    z-index:0;
    background: #F5F5F5;
    overflow-y: hidden;
    height: 100vh;`

const ChatContainer = styled.div`
   float: left;
    width:65%;
    margin-left:0px;
    margin-right:0px;
    padding-left:0px;
    padding-right:0px;`

const ExtendContainer = styled.div`
    float: left;
    width:35%;
    background:pink;
    margin-left:0px;
    margin-right:0px;
    padding-left:5px;
    padding-right:5px;   
    border-left: lightgray solid 1px;
    height: 100%;`

const MainRegion = styled.div`
    margin-left:45px;
    z-index:1;
    background: white;`





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
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }


    render() {
        const { page, error } = this.props;
        if (error != null) {
            Alert.success('Test message stackslide effect!', {
                position: 'top-right',
                effect: 'stackslide'
            });
        }
        return (
            <div>
                <Background img={BackgroundImg} />
                <div className="row">
                    <NavibarContainer>
                        <Navibar />
                    </NavibarContainer>
                    <MainRegion className="col-md-12">
                        <div className="row">
                            <ListRegion>
                                <SearchBoxContainer>
                                    <CustomerSearch/>
                                </SearchBoxContainer>
                                <ListContainerDivWithAutoSize isAbsolute={true}>
                                    <ListContainer>
                                        {page === pageType.CHAT && <ChatList />}
                                        {page === pageType.CUSTOMER_LIST && <CompositList />}
                                    </ListContainer>
                                </ListContainerDivWithAutoSize>
                            </ListRegion>

                            <DetailContainer>
                                <ChatContainer >
                                    <Chat />
                                </ChatContainer>
                                <ExtendContainer >
                                </ExtendContainer>

                            </DetailContainer>
                        </div>

                    </MainRegion>
                </div>
                <Alert stack={true} timeout={3000} />
            </div>

        );
    }
}


function mapStateToProps(state) {
    const states = state.home;
    const { error } = state.system;
    return { ...states, error };
}


const page = connect(mapStateToProps)(HomePage);

/**
 * 主页
 */
export { page as HomePage }; 