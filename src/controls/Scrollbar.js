import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

 /**
  * 重新实现方法，更改cursor
  * @param {*} param0 
  */
 function renderThumbVerticalDefault({ style, ...props }) {
    const finalStyle = {
        ...style,
        cursor: 'default', //此处将pointer改成default
        borderRadius: 'inherit',
        backgroundColor: 'rgba(0,0,0,.2)'
    };
    return <div style={finalStyle} {...props} />;
}



Scrollbars.defaultProps = {
    ...Scrollbars.defaultProps,
    
    renderThumbVertical: renderThumbVerticalDefault,//指定新的renderThumbVerticalDefault
    
};
 
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


 