import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { configurationActions as actions } from '../actions';
import TreeView from 'react-treeview';
import ReactTooltip from 'react-tooltip';
require('../../assets/styles/react-treeview.css');

const unSelectNodeStyle = {
    color: 'black',
    backGround: 'trasnparent',
}

const selectNodeStyle = {
    color: 'white',
    background: '#398dee',
}

const iconStyle = {
    marginRight: 3,
}
const iconStyle2 = {
    marginRight: 3,
    marginLeft: 7,
}


/** 
 * 常用语组件 
 */
class CommonPhraseTreeView extends Component {

    constructor(props) {
        super(props);
        this.state={selectNodeKey:null,collapsed:true};
        this.onNodeClick = this.onNodeClick.bind(this);
        this.onNodeDoubleClick =this.onNodeDoubleClick.bind(this);
    }

    getNodeStyle(key) {
        const { selectedCommonPhraseNodeKey } = this.props;
        if (selectedCommonPhraseNodeKey == null) {
            return unSelectNodeStyle;
        }
        if (key == selectedCommonPhraseNodeKey) {
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

    getContentKey(key) {
        return 'content_' + key;
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return this.props.staffs!=  nextProps.staffs  ;
    // }


    collapseAll() {
        this.setState({
            collapsedBookkeeping: this.state.collapsedBookkeeping.map(() => true),
        });
    }

    onNodeClick(e) {
        const { key } = e._targetInst;
        console.log(key);
        const { dispatch } = this.props;
        dispatch(actions.selectCommonPhraseNode(key));

    }

    onNodeDoubleClick(e) {
          const { key } = e._targetInst;
   ???
        const {collapsed} =this.state;
        this.setState({})
 this.forceUpdate();
    }

    onSendCommonPhrase(e) {
        const cp = e._targetInst.key;
        //to do-- 
        alert(cp);

    }

    render() {
        //":[{"PhraseId":28,"Category":"问候语","SmallCategoryId":27,"SmallCategoryName":"你好","Title":"测试","Content":"测试","CategorySort":0,"AppKey":null,"AppKeyId":8}...]
        const { commonPhrase } = this.props;
        const{selectNodeKey,collapsed} =this.state;
        const dataSource = this.convertToNode(commonPhrase);
        return (
            <div>
                {dataSource.map((node, i) => {
                    const type = node.type;
                    const categoryKey = 'category_' + type;
                    const label =
                        <span>
                            <i className="fa fa-folder-o" style={iconStyle}></i>
                            <span className="node" key={categoryKey} onClick={this.onNodeClick} style={this.getNodeStyle(categoryKey)}>
                                {type}
                            </span>
                        </span>;
                    return (
                        <TreeView key={type} nodeLabel={label} defaultCollapsed={node.collapsed}>
                            {node.smallCategories.map(sc => {
                                const smallcategoryKey = 'smallcategory_' + sc.smallCategoryName;
                                const label2 =
                                    <span>
                                        <i className="fa fa-folder-o" style={iconStyle}></i>
                                        <span className="node" key={smallcategoryKey} 
                                        onDoubleClick={this.onNodeDoubleClick}
                                        onClick={this.onNodeClick} 
                                        style={this.getNodeStyle(smallcategoryKey)}>
                                            {sc.smallCategoryName}
                                        </span>
                                    </span>;
                                return (
                                    <TreeView nodeLabel={label2} key={sc.smallCategoryName} defaultCollapsed={sc.collapsed}>
                                        {
                                            sc.nodes.map(x => (
                                                <div key={this.getContentKey(x.content)} data-tip={x.content} data-place='right'>
                                                    <span>
                                                        <i className="fa fa-file-text-o" style={iconStyle2}></i>
                                                        <span className="node" key={this.getContentKey(x.content)}
                                                            onClick={this.onNodeClick}
                                                            onDoubleClick={this.onSendCommonPhrase}
                                                            style={this.getNodeStyle(this.getContentKey(x.content))}>
                                                            {x.title}
                                                        </span>
                                                    </span>
                                                </div>
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
