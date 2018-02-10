import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
 



export class Home extends Component {

    constructor(props) {
        super(props);
        this.clearUserInfo=this.clearUserInfo.bind(this);
    }

    clearUserInfo(){
        localStorage.removeItem("user");
    }

     

    render() {
        
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Home</h2>
                 <button onClick={this.clearUserInfo}>clear</button>
            </div>
        );
    }
}


// function mapStateToProps(state) {

//     const {loggingIn,user} =state.auth;
//     return {
//       loggingIn :loggingIn,
//       user:user,

//     };
// }

// export default connect(mapStateToProps,null)(Login);
////const connectedLoginPage = connect(mapStateToProps)(Login);
//export { connectedLoginPage as Login }; 