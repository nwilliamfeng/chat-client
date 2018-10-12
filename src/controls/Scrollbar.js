import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { isEqual } from 'lodash'
require('../assets/styles/scrollbar.css')



const OutContainer = styled.div`
    overflow-y: hidden;
    height:100%;
    position:absolute;
    width:100%;
`;

const ScrollDiv = styled.div`
    float: left;
    clear: both;
    width: 0px; 
`;


/**
 * 支持垂直滚动
 * @param {*} InnerComponent 
 */
export const withScroll = InnerComponent => class extends React.Component {

    constructor(props) {
        super(props);
        this.state = { topOffset: 0, isTop: false };
    }

    _handleScroll = e => {
        const { top } = ReactDOM.findDOMNode(this.scrollDiv).getBoundingClientRect();
        const scrollHeight = ReactDOM.findDOMNode(this.container).scrollHeight;
        const { topOffset, isTop } = this.state;
        if (top > scrollHeight) {


            if (topOffset < top && !isTop) {
                console.log(top);
                this.setState({ isTop: true });
            }
        }
        else {
            this.setState({ isTop: false });
        }
        this.setState({ topOffset: top });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (!isEqual(this.props, nextProps)) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        const list = ReactDOM.findDOMNode(this.container);
        list.addEventListener('scroll', this._handleScroll);
    }

    componentWillUnmount() {
        const list = ReactDOM.findDOMNode(this.container);
        list.removeEventListener('scroll', this._handleScroll);
    }

    componentDidUpdate(nextProps, nextState, nextContext) {
        const { autoScroll } = this.props;
        if (autoScroll) {
            this.scrollToBottom();
        }
    }

    scrollToBottom = () => {
        if (this.scrollDiv != null) {
            this.scrollDiv.scrollIntoView();
        }
    }


    render() {
        console.log('render scroll');
        return (
            <OutContainer className='scollContainer' ref={el => this.container = el} >
                <InnerComponent {...this.props} />
                <ScrollDiv ref={el => this.scrollDiv = el} />

            </OutContainer>
        )
    }
} 