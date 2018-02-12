import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../actions';



class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { userName: '', userPassword: '', submitted: false }; //初始化登录状态

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();//禁止网页跳转
        this.setState({ submitted: true });//设置已经执行提交操作
        const { userName, userPassword } = this.state;
        const { dispatch } = this.props;

        //在用户名和密码输入后执行
        if (userName && userPassword) {
            dispatch(authActions.login(userName, userPassword));
        }

    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }



    render() {
        const { loggingIn, error } = this.props; //传入的状态值
         
        const { userName, userPassword, submitted } = this.state;//自己持有的状态值
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>欢迎使用在线客服系统，请登录</h2>
                <p></p>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !userName ? ' has-error' : '')}>
                        <label htmlFor="userName">用户名</label>
                        <input type="text" className="form-control" name="userName" value={userName} onChange={this.handleInputChange} />
                        {submitted && !userName &&
                            <div className="help-block">请输入用户名</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !userPassword ? ' has-error' : '')}>
                        <label htmlFor="userPassword">登录密码</label>
                        <input type="password" className="form-control" name="userPassword" value={userPassword} onChange={this.handleInputChange} />
                        {submitted && !userPassword &&
                            <div className="help-block">请输入密码</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">登录</button>
                        {loggingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }

                    </div>
                </form>
                <p />

                <div className="help-block" >{error}</div>

            </div>
        );
    }
}


function mapStateToProps(state) {

   return state.auth;
    // const { loggingIn, user, error } = state.auth;
    // return {
    //     loggingIn: loggingIn,
    //     user: user,
    //     error: error,

    // };
}


const connectedLoginPage = connect(mapStateToProps)(Login);
/**
 * Login实例
 */
export { connectedLoginPage as Login }; 