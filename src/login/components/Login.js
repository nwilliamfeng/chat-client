import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {authActions} from '../actions';



 class Login extends Component{

    constructor(props){
        super(props);
        this.state ={userName:'',userPassword:''};
        this.onClick =this.onClick.bind(this);
       // this.onSubmit =this.onSubmit.bind(this);
       // this.onInputChange =this.onInputChange.bind(this);
    }

    onClick() {
       
        console.log(this.props);
        this.setState({ userName: 'tom', userPassword:'234' });
        const { userName, userPassword } = this.state;
        const { dispatch } = this.props;
        console.log("sdfsf"+dispatch);
            dispatch(authActions.login(userName, userPassword));
        
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
               <button onClick={this.onClick}>login</button>
               {/* <form onSubmit={this.onSubmit} onChange={this.onInputChange}>
                    <input onchange={this.onUserNameChanged} value={this.state.userName}/>            
                    <button  type="submit">登录</button>
             
                </form> */}
           </div> 
        );
    }
}


function mapStateToProps(state) {
     
    return {
        
    };
}

//export default connect(mapStateToProps,null)(Login);
const connectedLoginPage = connect(mapStateToProps)(Login);
export { connectedLoginPage as Login}; 