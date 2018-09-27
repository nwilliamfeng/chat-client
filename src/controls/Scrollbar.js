import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

 
export  class Scrollbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { autoHide: true };
    }

    handleMouseEnter = () => {
        this.setState({ autoHide: false });
    }

    handleMouseLeave = () => {
        this.setState({ autoHide: true });
    }

    scrollTop=offSet=>{
        this.refs.scrollbar.scrollTop(offSet);
    }


    handleScrollFrame = value => {

        const { onScroll } = this.props;
        if (onScroll != null) {
            onScroll(value);
        }
    }

    render() {
        const { autoHide } = this.state;
        const {style} =this.props;
        return (
            <div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <Scrollbars style={style} ref='scrollbar' onScrollFrame={this.handleScrollFrame} autoHide={autoHide} >
                    {this.props.children}
                </Scrollbars>
            </div>)
    }
}


 