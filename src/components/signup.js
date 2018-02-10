import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBarExampleIconButton from './Navbar'
import {signupAction} from '../store/action/action';
class Signup extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
            email: '',
            userName: '',
            password: ''
        }


        this.signup = this.signup.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangeUserName = this._onChangeUserName.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);

    }

    signup() {
        let user = {
            email: this.state.email,
            username: this.state.userName,
            password: this.state.password
        }
        this.setState({
            email: '',
            userName: '',
            password: ''
        })
        this.props.signupwithEmailPassword(user);
    }
    _onChangeEmail(event){
        this.setState({
            email:event.target.value
        })
    }
    _onChangeUserName(event){
        this.setState({
            userName:event.target.value
        })
    }
    _onChangePassword(event){
        this.setState({
            password:event.target.value
        })
    }

    render() {
        return (
            <div>
                <div>
                <AppBarExampleIconButton />
                <div className="loginPage">
                <div class="loginBox form-group col-md-12">
                    <div class="form-group">
                    <input type="email" className="form-control" id="userName"
                    onChange={this._onChangeUserName} 
                    aria-describedby="userName" placeholder="User Name"/>
                     </div>
                    <div class="form-group">
                    <input type="email" className="form-control" id="emaillog"
                    onChange={this._onChangeEmail} 
                    aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div class="form-group">
                    <input type='password' className="form-control" name='password' 
                    value={this.state.password}  placeholder="Enter Password"
                    onChange={this._onChangePassword} />
                     </div>
                     <div>
                    <button type="submit" onClick={this.signin} className="btn btn-primary btn-lg btn-block">Sign Up</button>
                    </div>
                    </div>
                    </div>
            </div>

                  

                <h1>Hello World Signup</h1>
                <label>Email:<input type='text' name='email' value={this.state.email} onChange={this._onChangeEmail} /></label>
                <br />
                <label>User Name:<input type='text' name='username' value={this.state.userName} onChange={this._onChangeUserName}/></label>
                <br />
                <label>Password:<input type='password' name='password' value={this.state.password} onChange={this._onChangePassword}/></label>
                <button onClick={this.signup}>Signup</button>
            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        // userName: state.root.userName
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())}
        signupwithEmailPassword: (userDetails)=>{
            dispatch(signupAction(userDetails));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signup);

