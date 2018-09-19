import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight as arrowRight, faChevronDown as arrowDown } from '@fortawesome/free-solid-svg-icons';


const Div = styled.div`
    padding:1px 5px;
    width:100vh;
    &:hover{
        color: orangered;
        background-color:lightgray;
    }
`;

const Label =styled.label`
    margin-top:2px;
`;


const Arrow = styled.span`  
    margin-right:10px;
`;

/**
 * 可折叠面板
 * @param {*} param0 
 */
export class ExpandPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpand: false,//是否展开状态
        }
    }

    handleDoubleClick = () => {
        const {isExpand} =this.state;
        this.setState({isExpand:!isExpand});
    }


    render() {
        const { isExpand } = this.state;
        const { children, title } = this.props;
        return (
            <div>
                <Div onDoubleClick={this.handleDoubleClick}>
                    <Arrow onClick={this.handleDoubleClick}>
                        <FontAwesomeIcon icon={isExpand === true ? arrowDown : arrowRight} size='xs' />
                    </Arrow>
                    <Label>{title}</Label>
                </Div>
                {isExpand===true && children}
            </div>

        )
    }
}