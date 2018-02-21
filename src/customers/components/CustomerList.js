import React, { Component } from 'react';
import { connect } from 'react-redux';

 class CustomerList extends Component {
    render() {
        return (
            <div  >
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th >来源</th>
                            <th >状态</th>
                            <th >业务来源</th>
                            <th >客服姓名</th>
                            <th >客户ID</th>
                            <th >三方ID</th>
                            <th >姓名</th>
                            <th >IP地址(位置)</th>                           
                            <th >进入时刻</th>
                        </tr>
                    </thead>
                    <tbody >
                    {
    //   todos.map((item) => (
    //     <TodoItem
    //       key={item.id}
    //       text={item.text}
    //       completed={item.completed}
    //       onToggle={() => onToggleTodo(item.id)}
    //       onRemove={() => onRemoveTodo(item.id)}
    //     />
    //     ))
    }
                    </tbody>

                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {

    return state.auth; 
}


const page = connect(mapStateToProps, null)(CustomerList);
/**
 * CustomerList实例
 */
export { page as CustomerList }; 
