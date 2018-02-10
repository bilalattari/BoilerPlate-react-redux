import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase , {provider} from 'firebase'
import { Link } from 'react-router-dom';
import {signinAction} from '../store/action/action';
import AppBarExampleIconButton from './Navbar'
class Signin extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
            email: '',
            password: ''
        }


        this.signin = this.signin.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);

    }

    signin() {
        let user = {
            email: this.state.email,
            password: this.state.password,
            userName: this.props.userName
        }
        this.setState({
            email: '',
            password: ''
        })
        this.props.signinWithEmailPassword(user);
    }
    _onChangeEmail(event){
        this.setState({
            email:event.target.value
        })
    }
    _onChangePassword(event){
        this.setState({
            password:event.target.value
        })
    }
    facebookSignin(event) {
        event.preventDefault()
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
    
    .then(function(result) {
       var token = result.credential.accessToken;
       var user = result.user;
         
       console.log(token)
       console.log(user.name);
       console.log(user.email);
       console.log(user.photoURL);
       var obj={
           name:user.name,
           email:user.email,
           userpic:user.photoURL
       }
       localStorage.setItem("myyUser",JSON.stringify(obj));
       console.log(user);
    //    location="home.html";
    }).catch(function(error) {
       console.log(error.code);
       console.log(error.message);
    });
 }


GoogleSignin(){
    const provider2 = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider2).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        console.log(user.displayName);
        console.log(user.email);
        console.log(user.photoURL);
        var obj={
            name:user.displayName,
            email:user.email,
            userpic:user.photoURL
        }
        localStorage.setItem("myyUser",JSON.stringify(obj));
        console.log(user);
        // location="home.html";
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}
    render() {
        return (
            <div>
                <AppBarExampleIconButton />
                <div className="loginPage">
                <div class="loginBox form-group col-md-12">
                 <div>
                     <a href="" onClick  = {this.facebookSignin.bind(this)}>facebook</a>
                     <a href="" onClick  = {this.GoogleSignin.bind(this)}>Google</a>
                     
                {/* <a href="#"> <img src="" width="112px;" height="72px" onclick="facebookSignin()" alt=""/> </a>
               <a href="#"> <img src="17.png" width="112px;" height="72px"onclick="GoogleSignin()" alt=""/> </a>  */}
                </div>
                   <div className = 'signinheading'>
                       SIGN IN
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
                    <button type="submit" onClick={this.signin} className="btn btn-primary btn-lg btn-block">Sign In</button>
                    </div>
                     <div className="createBox">
                       <p>Are you new? 
                       <Link to = '/signup'>Create new account  </Link></p>
                      </div>
                    </div>
                    </div>
            </div>
        )
    } 
}

function mapStateToProp(state) {
    console.log(state.root.currentUser.name)
    return ({
        userName: state.root.currentUser.name
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())}
        signinWithEmailPassword: (user)=>{
            dispatch(signinAction(user))
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signin);

