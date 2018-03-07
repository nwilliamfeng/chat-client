import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { configurationActions as actions } from '../actions';
import TreeView from 'react-treeview';
require('../../assets/styles/react-treeview.css');

 
 //":[{"PhraseId":28,"Category":"问候语","SmallCategoryId":27,"SmallCategoryName":"你好","Title":"测试","Content":"测试","CategorySort":0,"AppKey":null,"AppKeyId":8}...]

const dataSource = [
    {
      type: 'Employees',
      collapsed: false,
      people: [
        {name: 'Paul Gordon', age: 29, sex: 'male', role: 'coder', collapsed: false},
        {name: 'Sarah Lee', age: 27, sex: 'female', role: 'ocamler', collapsed: false},
      ],
    },
    {
      type: 'CEO',
      collapsed: true,
      people: [
        {name: 'Drew Anderson', age: 39, sex: 'male', role: 'boss', collapsed: false},
      ],
    },
     
    {
      type: 'CEO2',
      collapsed: false,
      people: [
        {name: 'Drew Anderson2', age: 23, sex: 'male', role: 'boss2', collapsed: false},
      ],
    },
  ];


class CommonPhraseTreeView extends Component {

    constructor(props) {
        super(props);
        
        
    }

     
    componentDidMount() {
        console.log("CommonPhraseTreeView componetDidMount");

        const { dispatch } = this.props;
       // dispatch(actions.fetchCommonPhrase());
       
    }



    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return this.props.staffs!=  nextProps.staffs  ;
    // }

    
    collapseAll() {
        this.setState({
            collapsedBookkeeping: this.state.collapsedBookkeeping.map(() => true),
        });
    }



    render() {
         //":[{"PhraseId":28,"Category":"问候语","SmallCategoryId":27,"SmallCategoryName":"你好","Title":"测试","Content":"测试","CategorySort":0,"AppKey":null,"AppKeyId":8}...]
            return (
              <div>
                {dataSource.map((node, i) => {
                  const type = node.type;
                  const label = <span className="node">{type}</span>;
                  return (
                    <TreeView key={type + '|' + i} nodeLabel={label} defaultCollapsed={node.collapsed}>
                      {node.people.map(person => {
                        const label2 = <span className="node">{person.name}</span>;
                        return (
                          <TreeView nodeLabel={label2} key={person.name} defaultCollapsed={person.collapsed}>
                            <div className="info">age: {person.age}</div>
                            <div className="info">sex: {person.sex}</div>
                            <div className="info">role: {person.role}</div>
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
    const { CommonPhrase } = state.configuration;
    return { CommonPhrase };
}


const page = connect(mapStateToProps, null)(CommonPhraseTreeView);

/**
 * CommonPhraseTreeView实例
 */
export { page as CommonPhraseTreeView }; 
