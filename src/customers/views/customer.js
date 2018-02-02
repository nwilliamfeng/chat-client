import React, { Component } from 'react';

export class CustomerList extends Component {
    render() {
        return (
            <div  >
                <table class="gridtable">
                    <thead>
                        <tr>
                            <th >序号</th>
                            <th >来源</th>
                            <th >状态</th>
                            <th >客服姓名</th>
                            <th >客户ID</th>
                            <th >姓名</th>
                            <th >IP地址</th>
                            <th >地理位置</th>
                            <th >进入时刻</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td>234</td>
                            <td>PC</td>
                            <td>聊天中</td>
                            <td>客服1</td>
                            <td>12345</td>
                            <td>客户2</td>
                            <td>172.56.253.83</td>
                            <td>上海</td>
                            <td>14:40</td>
                        </tr>
                        <tr>
                            <td>235</td>
                            <td>Android</td>
                            <td>聊天中</td>
                            <td>客服3</td>
                            <td>567567</td>
                            <td>客户3</td>
                            <td>171.56.153.66</td>
                            <td>上海</td>
                            <td>14:40</td>
                        </tr>
                    </tbody>

                </table>


            </div>
        );
    }
}
