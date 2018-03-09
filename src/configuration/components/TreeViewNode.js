import React from 'react';
import ReactTooltip from 'react-tooltip';

const iconStyle = {
    marginRight: 3,
}

const iconStyle2 = {
    marginRight: 3,
    marginLeft: 7,
}


export const CategoryNode = ({ nodeKey, title, onClick, getStyle }) => {
    const onNodeClick = () => {
        onClick(nodeKey);
    }
    return (
        <span onClick={onNodeClick}>
            <i className="fa fa-folder-o" style={iconStyle}></i>
            <span className="node"
                style={getStyle(nodeKey)}>
                {title}
            </span>
        </span>
    )
}

export const LeafNode = ({ nodeKey, title, content, onClick, onDoubleClick, getStyle }) => {

    const onNodeClick = () => {
        onClick(key);
    }
    const onNodeDoubleClick = () => {
        onDoubleClick(content);
    }
    const key = 'content_' + nodeKey;
    return (
        <div key={key} data-tip={content} data-place='right' onClick={onNodeClick} onDoubleClick={onNodeDoubleClick}>
            <span>
                <i className="fa fa-file-text-o" style={iconStyle2}></i>
                <span className="node"

                    style={getStyle(key)}>
                    {title}
                </span>
            </span>
            <ReactTooltip delayShow={500} />
        </div>
    )
}
