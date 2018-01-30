import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {executeLogin} from '../actions';



export class Login extends Component{

    constructor(props){
        super(props);
        this.state ={userName:'',userPassword:''};
        this.onSubmit =this.onSubmit.bind(this);
        this.onInputChange =this.onInputChange.bind(this);
    }

    onSubmit(event){
        event.preventDefault();//禁止网页跳转

        let data =this.props;
        console.log(data);
        const name =this.state.userName;
        //to do const password=...
      //  this.props.login();
        this.setState({userName:'',userPassword:''});        
    }

    onInputChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
     }

     

    render(){
        return (
           <div>
               <form onSubmit={this.onSubmit} onChange={this.onInputChange}>
                    <input onchange={this.onUserNameChanged} value={this.state.userName}/>            
                    <button  type="submit">登录</button>
             
                </form>
           </div> 
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
      onLogin: (text) => {
        dispatch(addTodo(text));
      }
    }
  };

export default connect()(Login);