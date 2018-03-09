import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { configurationActions as actions } from '../actions';
import TreeView from 'react-treeview';
import ReactTooltip from 'react-tooltip';
import { CategoryNode, LeafNode } from './TreeViewNode.js'
require('../../assets/styles/react-treeview.css');

export const unSelectNodeStyle = {
    color: 'black',
    backGround: 'trasnparent',
}

export const selectNodeStyle = {
    color: 'white',
    background: '#398dee',
}


/** 
 * 常用语组件 
 */
class CommonPhraseTreeView extends Component {

    constructor(props) {
        super(props);
        this.state = { selectNodeKey: null, folderNodeDoubleClick: null };
        this.onNodeClick = this.onNodeClick.bind(this);
        this.getNodeStyle = this.getNodeStyle.bind(this);
    }

    getNodeStyle(key) {
        const { selectNodeKey } = this.state;
        if (selectNodeKey == null) {
            return unSelectNodeStyle;
        }
        if (key == selectNodeKey) {
            return selectNodeStyle;
        }
        return unSelectNodeStyle;
    }

    convertToNode(commonPhrase) {
        let result = [];
        if (commonPhrase == null) {
            return result;
        }
        let categoryNames = [];
        commonPhrase.forEach(x => {
            if (!categoryNames.includes(x.Category)) {
                categoryNames.push(x.Category);
            }
        });


        categoryNames.forEach(x => {
            const category = {
                type: x,
                collapsed: false,
                smallCategories: [],
            }
            commonPhrase.forEach(y => {
                if (y.Category == x) {
                    let exist = category.smallCategories.find(item => item.smallCategoryId == y.SmallCategoryId);
                    if (exist == null) {
                        category.smallCategories.push(
                            {
                                smallCategoryId: y.SmallCategoryId,
                                smallCategoryName: y.SmallCategoryName,
                                nodes: [{ title: y.Title, content: y.Content }],
                            }
                        );
                    }
                    else {
                        exist.nodes.push({ title: y.Title, content: y.Content });
                    }
                }
            });
            result.push(category);
        })
        return result;
    }


    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(actions.fetchCommonPhrase());
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return this.props.staffs!=  nextProps.staffs  ;
    // }


    /**
     * 节点选中
     */
    onNodeClick(key) {
        this.setState({ selectNodeKey: key });
        this.forceUpdate(); //强制render
    }

    /**
     * 发送常用语
     * @param {*} content 
     */
    onSendCommonPhrase(content) {
        alert(content);
    }


    render() {
        //样例： ":[{"PhraseId":28,"Category":"问候语","SmallCategoryId":27,"SmallCategoryName":"你好","Title":"测试","Content":"测试","CategorySort":0,"AppKey":null,"AppKeyId":8}...]
        const { commonPhrase } = this.props;
        const dataSource = this.convertToNode(commonPhrase);
        const { collapsed } = this.state;
        return (
            <div>
                {dataSource.map((node, i) => {
                    const type = node.type;
                    const categoryKey = 'category_' + type;
                    const label = <CategoryNode nodeKey={categoryKey} title={type} onClick={this.onNodeClick} getStyle={this.getNodeStyle} />
                    return (
                        <TreeView key={type} nodeLabel={label} defaultCollapsed={false}>
                            {node.smallCategories.map(sc => {
                                const smallcategoryKey = 'smallcategory_' + sc.smallCategoryName;
                                const label2 =
                                    <CategoryNode nodeKey={smallcategoryKey} title={sc.smallCategoryName} onClick={this.onNodeClick} getStyle={this.getNodeStyle} />
                                return (
                                    <TreeView nodeLabel={label2} key={sc.smallCategoryName} defaultCollapsed={false}>
                                        {
                                            sc.nodes.map(x => (
                                                <LeafNode key={x.content}
                                                    nodeKey={x.content} title={x.title}
                                                    content={x.content}
                                                    onClick={this.onNodeClick}
                                                    onDoubleClick={this.onSendCommonPhrase}
                                                    getStyle={this.getNodeStyle} />
                                            ))
                                        }
                                    </TreeView>
                                );
                            })}
                        </TreeView>
                    );
                })}
            </div>
        );
    }

}


function mapStateToProps(state) {
    const { commonPhrase, selectedCommonPhraseNodeKey } = state.configuration;
    return { commonPhrase, selectedCommonPhraseNodeKey };
}


const page = connect(mapStateToProps, null)(CommonPhraseTreeView);

/**
 * CommonPhraseTreeView实例
 */
export { page as CommonPhraseTreeView }; 
