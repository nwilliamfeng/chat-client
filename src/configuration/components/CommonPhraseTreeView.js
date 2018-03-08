import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { configurationActions as actions } from '../actions';
import TreeView from 'react-treeview';
import ReactTooltip from 'react-tooltip';
require('../../assets/styles/react-treeview.css');

const unSelectNodeStyle={
    color:'black',
    backGround:'trasnparent',
}

const selectNodeStyle={
    color:'white',
    background:'#398dee',
}

/** 
 * 常用语组件 
 */
class CommonPhraseTreeView extends Component {

    constructor(props) {
        super(props);
        this.onNodeClick=this.onNodeClick.bind(this);
    }

    getNodeStyle(node){
        const {selectedCommonPhraseNode} =this.props;
        if(selectedCommonPhraseNode==null){
            return unSelectNodeStyle;
        }
        if(node.key==selectedCommonPhraseNode.key && node.type== selectedCommonPhraseNode.type){
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


    collapseAll() {
        this.setState({
            collapsedBookkeeping: this.state.collapsedBookkeeping.map(() => true),
        });
    }

    onNodeClick(e){
        const {key,type}=e._targetInst ; 
        console.log(key+type);
        const { dispatch } = this.props;
        dispatch(actions.selectCommonPhraseNode({key,type}));

    }

    onSendCommonPhrase(e ) {
       const cp=e._targetInst.key ; 
       //to do-- 

    }

    

    render() {
        //":[{"PhraseId":28,"Category":"问候语","SmallCategoryId":27,"SmallCategoryName":"你好","Title":"测试","Content":"测试","CategorySort":0,"AppKey":null,"AppKeyId":8}...]
        const { commonPhrase } = this.props;
        const dataSource = this.convertToNode(commonPhrase);
        return (
            <div>
                {dataSource.map((node, i) => {
                    const type = node.type;
                    const label = <span className="node" key={type} onClick={this.onNodeClick} style={this.getNodeStyle({key:type,type:'span'})}><i className="fa fa-folder-o"></i>{type}</span>;
                    return (
                        <TreeView key={type} nodeLabel={label} defaultCollapsed={node.collapsed}>
                            {node.smallCategories.map(sc => {
                                const label2 = 
                                <span className="node"  key={sc.smallCategoryName} onClick={this.onNodeClick} style={this.getNodeStyle({key:sc.smallCategoryName,type:'span'})} >
                                {sc.smallCategoryName}
                                </span>;
                                return (
                                    <TreeView nodeLabel={label2} key={sc.smallCategoryName} defaultCollapsed={sc.collapsed}>
                                        {
                                            sc.nodes.map(x => (
                                                <div className="info" key={x.content} data-tip={x.content} data-place='right'
                                                 style={this.getNodeStyle({key:x.content,type:'div'})}
                                                 onClick={this.onNodeClick} onDoubleClick={this.onSendCommonPhrase} >
                                                    {x.title}
                                                    <ReactTooltip/>
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
    const { commonPhrase ,selectedCommonPhraseNode} = state.configuration;
    return { commonPhrase,selectedCommonPhraseNode };
}


const page = connect(mapStateToProps, null)(CommonPhraseTreeView);

/**
 * CommonPhraseTreeView实例
 */
export { page as CommonPhraseTreeView }; 
