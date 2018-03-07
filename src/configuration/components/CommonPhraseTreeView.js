import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { configurationActions as actions } from '../actions';
import TreeView from 'react-treeview';
require('../../assets/styles/react-treeview.css');


const dataSource2 = [
  {
    type: 'Employees',
    collapsed: false,
    people: [
      { name: 'Paul Gordon', age: 29, sex: 'male', role: 'coder', collapsed: false },
      { name: 'Sarah Lee', age: 27, sex: 'female', role: 'ocamler', collapsed: false },
    ],
  },
  {
    type: 'CEO',
    collapsed: true,
    people: [
      { name: 'Drew Anderson', age: 39, sex: 'male', role: 'boss', collapsed: false },
    ],
  },

  {
    type: 'CEO2',
    collapsed: false,
    people: [
      { name: 'Drew Anderson2', age: 23, sex: 'male', role: 'boss2', collapsed: false },
    ],
  },
];


class CommonPhraseTreeView extends Component {

  constructor(props) {
    super(props);


  }

  //":[{"PhraseId":28,"Category":"问候语","SmallCategoryId":27,"SmallCategoryName":"你好","Title":"测试","Content":"测试","CategorySort":0,"AppKey":null,"AppKeyId":8}...]

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



  // render() {
  //   //":[{"PhraseId":28,"Category":"问候语","SmallCategoryId":27,"SmallCategoryName":"你好","Title":"测试","Content":"测试","CategorySort":0,"AppKey":null,"AppKeyId":8}...]
  //   const { commonPhrase } = this.props;
  //   return (
  //     <div>
  //       {dataSource.map((node, i) => {
  //         const type = node.type;
  //         const label = <span className="node">{type}</span>;
  //         return (
  //           <TreeView key={type + '|' + i} nodeLabel={label} defaultCollapsed={node.collapsed}>
  //             {node.people.map(person => {
  //               const label2 = <span className="node">{person.name}</span>;
  //               return (
  //                 <TreeView nodeLabel={label2} key={person.name} defaultCollapsed={person.collapsed}>
  //                   <div className="info">age: {person.age}</div>
  //                   <div className="info">sex: {person.sex}</div>
  //                   <div className="info">role: {person.role}</div>
  //                 </TreeView>
  //               );
  //             })}
  //           </TreeView>
  //         );
  //       })}
  //     </div>
  //   );
  // }

  render() {
    //":[{"PhraseId":28,"Category":"问候语","SmallCategoryId":27,"SmallCategoryName":"你好","Title":"测试","Content":"测试","CategorySort":0,"AppKey":null,"AppKeyId":8}...]
    const { commonPhrase } = this.props;
    const dataSource = this.convertToNode(commonPhrase);
    return (
      <div>
        {dataSource.map((node, i) => {
          const type = node.type;
          const label = <span className="node">{type}</span>;
          return (
            <TreeView key={type + '|' + i} nodeLabel={label} defaultCollapsed={node.collapsed}>
              {node.smallCategories.map(sc => {
                const label2 = <span className="node">{sc.smallCategoryName}</span>;
                return (
                  <TreeView nodeLabel={label2} key={sc.smallCategoryName} defaultCollapsed={sc.collapsed}>
                    {
                      
                      sc.nodes.map(x => (
                        <div className="info" key={x.content}>{x.title}</div>
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
  const { commonPhrase } = state.configuration;
  return { commonPhrase };
}


const page = connect(mapStateToProps, null)(CommonPhraseTreeView);

/**
 * CommonPhraseTreeView实例
 */
export { page as CommonPhraseTreeView }; 
