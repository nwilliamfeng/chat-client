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

    // onClick() {

    //     this.setState({ userName:'tom',userPassword:'abc'});
    //     console.log(this.state);
    //     const { userName, userPassword } = this.state;
    //     const { dispatch } = this.props;
    //     console.log("sdfsf"+dispatch);
    //         dispatch(authActions.login(userName, userPassword));

    // }

    handleSubmit(event) {
        event.preventDefault();//禁止网页跳转
        const { userName, userPassword } = this.state;
        const { dispatch } = this.props;

        dispatch(authActions.login(userName, userPassword));
      
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }



    render() {
        const { loggingIn } = this.props; //传入的状态值
        const { userName, userPassword, submitted } = this.state;//自己持有的状态值
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
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
                        { loggingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }

                    </div>
                </form>
            </div>
        );
    }
}


function mapStateToProps(state) {

    const {loggingIn,user} =state.auth;
    return {
      loggingIn :loggingIn,
      user:user,

    };
}

// export default connect(mapStateToProps,null)(Login);
const connectedLoginPage = connect(mapStateToProps)(Login);
export { connectedLoginPage as Login }; 