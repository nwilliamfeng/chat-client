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
    margin-right:${props=>props.isExpand? '7px':'10px'};
`;

const Count =styled.span`
    border-radius:24px;
    margin-left:10px;
    margin-right:10px;
    padding:1px 6px;
    background:gray;
    color:white;
`;

/**
 * 可折叠面板
 * @param {*} param0 
 */
export class ExpandPanel extends Component {
    constructor(props) {
        super(props);
        const {isExpand,panelId}=props;
        console.log(props);
        this.state = {
            isExpand,//是否展开状态
            panelId,
        }
    }

    handleDoubleClick = () => {
        const {panelId, isExpand} =this.state;
        const nwValue=!isExpand;
        this.setState({isExpand:nwValue});
        const {expandHandle} =this.props;
        if(expandHandle!=null){
            expandHandle(panelId, nwValue);
        }
    }


    render() {
        const { isExpand } = this.state;
        console.log("render? "+isExpand);
        const { children, title,count } = this.props;
        return (
            <div>
                <Div onDoubleClick={this.handleDoubleClick}>
                    <Arrow onClick={this.handleDoubleClick} isExpand={isExpand}>
                        <FontAwesomeIcon icon={isExpand === true ? arrowDown : arrowRight} size='xs' />
                    </Arrow>
                    <Label>{title}</Label>
                    {count && <Count>{count}</Count>}
                </Div>
                {isExpand===true && children}
            </div>
        )
    }
}