import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { isEqual } from 'lodash'
import Rx from 'rx'
require('../assets/styles/scrollbar.css')



const OutContainer = styled.div`
    overflow-y: hidden;
    height:100%;
    position:absolute;
    width:100%;
`;

// const ScrollDiv = styled.div`
//     float: left;
//     clear: both;
//     width: 0px; 
// `;


/**
 * 支持垂直滚动
 */
export const withScroll = InnerComponent => {
    class InnerScrollBar extends React.Component {

        constructor(props) {
            super(props);
            this.state = { topOffset: 0, isTop: false };  
        }

        updateTopState=()=>{
            const { top } = ReactDOM.findDOMNode(this.scrollDiv).getBoundingClientRect();
            const scrollHeight = ReactDOM.findDOMNode(this.container).scrollHeight;
            const { topOffset, isTop } = this.state;
            if (top > scrollHeight) {
                if (topOffset < top && !isTop) {
                    this.setState({ isTop: true });
                }
            }
            else {
                this.setState({ isTop: false });
            }
            this.setState({ topOffset: top });
        }

        handleScroll = e => {
          this.updateTopState();
        }

        shouldComponentUpdate(nextProps, nextState, nextContext) {
            return !isEqual(this.props, nextProps)         
        }

        componentDidMount() {
            const list = ReactDOM.findDOMNode(this.container);
            list.addEventListener('scroll', this.handleScroll);
            this.checkIfScrollToBottom();
        }

        componentWillMount() {
            this.handleWheel$ = new Rx.Subject();
            this.handleWheel$.throttle(500).subscribe(this.handleWheel);
        }

        componentWillUnmount() {
            const list = ReactDOM.findDOMNode(this.container);
            list.removeEventListener('scroll', this.handleScroll);
            this.handleWheel$.dispose();
        }

        componentDidUpdate(nextProps, nextState, nextContext) {
            this.checkIfScrollToBottom();

        }

        checkIfScrollToBottom = () => {
            const { autoScrollBottom } = this.props;
            if (autoScrollBottom !== true) {
               this.setState({isTop:true});
               return;
            }
            if (this.scrollDiv != null) {
                try {
                    this.scrollDiv.scrollIntoView(true);
                }
                catch (error) {
                    console.log(`scrollToBottom raise error: ${error}`);
                }
            }
        }

        handleWheel = e => {
            if(e.deltaY>0){ //下滚不处理
                return;
            }
            const { isTop } = this.state;
            const { onScrollTop } = this.props;
            if (isTop === true && onScrollTop != null) {
                onScrollTop();
            }
        }


        render() {
            console.log('render scroll');
            return (
                <OutContainer className='scollContainer' ref={el => this.container = el} onWheel={e => this.handleWheel$.onNext(e)}>
                    <InnerComponent {...this.props} />
                    {/* 注意这里必须是react自己的dom element如果用自定义的element则在滚动时会抛出 _this.scrollDiv.scrollIntoView is not a function */}
                    <div ref={el => this.scrollDiv = el} />
                </OutContainer>
            )
        }
    }

    InnerScrollBar.propTypes = {
        autoScrollBottom: PropTypes.bool,
        onScrollTop: PropTypes.func.isRequired,

    }

    return InnerScrollBar;

}