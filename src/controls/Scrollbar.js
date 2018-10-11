import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import {isEqual} from 'lodash'
require('../assets/styles/scrollbar.css')

//  /**
//   * 重新实现方法，更改cursor
//   * @param {*} param0 
//   */
//  function renderThumbVerticalDefault({ style, ...props }) {
//     const finalStyle = {
//         ...style,
//         cursor: 'default', //此处将pointer改成default
//         borderRadius: 'inherit',
//         backgroundColor: 'rgba(0,0,0,.2)'
//     };
//     return <div style={finalStyle} {...props} />;
// }



// Scrollbars.defaultProps = {
//     ...Scrollbars.defaultProps,

//     renderThumbVertical: renderThumbVerticalDefault,//指定新的renderThumbVerticalDefault

// };

// export  class Scrollbar extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { autoHide: true };

//     }

//     handleMouseEnter = () => {
//         this.setState({ autoHide: false });
//     }

//     handleMouseLeave = () => {
//         this.setState({ autoHide: true });
//     }

//     scrollTop=offSet=>{
//         this.refs.scrollbar.scrollTop(offSet);
//     }

//     scrollToBottom=()=>{
//         this.refs.scrollbar.scrollToBottom();
//     }


//     handleScrollFrame = value => {

//         const { onScroll } = this.props;
//         if (onScroll != null) {
//             onScroll(value);
//         }
//     }

//     render() {
//         const { autoHide } = this.state;
//         const {style} =this.props;
//         return (
//             <div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
//                 <Scrollbars style={style} ref='scrollbar' onScrollFrame={this.handleScrollFrame} autoHide={autoHide} >
//                     {this.props.children}
//                 </Scrollbars>
//             </div>)
//     }
// }


const OutContainer = styled.div`
    overflow-y: hidden;
    height:100%;
    position:absolute;
    width:100%;
`;

 

export const withScroll = InnerComponent => class extends React.Component {

    constructor(props){
        super(props);
        this.state={topOffset:0,isTop:false}; 
    }

    _handleScroll = e => {
        const { top } = ReactDOM.findDOMNode(this.scrollDiv).getBoundingClientRect();
        const scrollHeight = ReactDOM.findDOMNode(this.refs.container).scrollHeight;
        const {topOffset,isTop}=this.state;
        if (top > scrollHeight){
            
           
            if(topOffset<top && !isTop){
                console.log(top);
                this.setState({isTop:true});
            }
        }
        else{
            this.setState({isTop:false});
        }
        this.setState({topOffset:top});
    }

    shouldComponentUpdate(nextProps,nextState,nextContext){
        if(!isEqual(this.props,nextProps)){
            return true;
        }
        return false;
    }

    componentDidMount() {
        const list = ReactDOM.findDOMNode(this.refs.container);
        list.addEventListener('scroll', this._handleScroll);
    }

    componentWillUnmount() {
        const list = ReactDOM.findDOMNode(this.refs.container);
        list.removeEventListener('scroll', this._handleScroll);
    }

    componentDidUpdate(nextProps, nextState, nextContext) {
        const { autoScroll } = this.props;
        if (autoScroll) {
            this.scrollToBottom();
        }
    }

    scrollToBottom = () => {
        this.scrollDiv.scrollIntoView();
    }


    render() {
        console.log('render scroll');
        return (<OutContainer className='scollContainer' ref='container' >
            <InnerComponent {...this.props} />
            <div style={{ float: "left", clear: "both",width:0 }}
                ref={(el) => { this.scrollDiv = el; }}>
            </div>
        </OutContainer>
        )
    }
} 