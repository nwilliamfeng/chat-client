import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { configurationActions as actions } from '../actions';
import TreeView from 'react-treeview';
require('../../assets/styles/react-treeview.css');

const dataSource = [
    ['Apple', 'Orange'],
    ['Facebook', 'Google'],
    ['Celery', 'Cheeseburger'],
];


class CommonPhraseTreeView extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log("CommonPhraseTreeView componetDidMount");

        const { dispatch } = this.props;
        dispatch(actions.fetchCommonPhrase());
        this.state = {
            collapsedBookkeeping: dataSource.map(() => false)
        };
        this.handleClick = this.handleClick.bind(this);
        this.collapseAll = this.collapseAll.bind(this);

    }



    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return this.props.staffs!=  nextProps.staffs  ;
    // }

    handleClick(i) {
        let [...collapsedBookkeeping] = this.state.collapsedBookkeeping;
        collapsedBookkeeping[i] = !collapsedBookkeeping[i];
        this.setState({ collapsedBookkeeping: collapsedBookkeeping });
    }

    collapseAll() {
        this.setState({
            collapsedBookkeeping: this.state.collapsedBookkeeping.map(() => true),
        });
    }



    render() {
        const { staffs } = this.props;

        return (
            <div>
                <button onClick={this.collapseAll}>Collapse all</button>
                {dataSource.map((node, i) => {
                    // Let's make it so that the tree also toggles when we click the
                    // label. Controlled components make this effortless.
                    const label =
                        <span className="node" onClick={this.handleClick.bind(null, i)}>
                            Type {i}
                        </span>;
                    return (
                        <TreeView
                            key={i}
                            nodeLabel={label}
                            collapsed={collapsedBookkeeping[i]}
                            onClick={this.handleClick.bind(null, i)}>
                            {node.map(entry => <div className="info" key={entry}>{entry}</div>)}
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
