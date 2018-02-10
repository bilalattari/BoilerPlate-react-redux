import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import firebase from 'firebase'
import history from '../History';
import {changeUserName } from '../store/action/action';
class Home extends Component {
 componentDidMount() {
       
    }
    _changeData(){
        console.log('event called');
        this.props.changeUserName();
    }
    login(){        
        this.props.login()
    }

    render() {
        return (
            <div>
                <h1>Hello World {this.props.userName}</h1>
                <button onClick={this._changeData.bind(this)}>Change</button>
                <Link to='/about'>Go to About</Link>

                 <div className="btn-group" onClick={this.login.bind(this)} >
                    <a className='btn btn-primary'><i className="fa fa-facebook" style={{ width: 6, height: 16 }}></i></a>
                    <a className='btn btn-primary ' href='' style={{ 'width': 180 }}> Sign in with Facebook</a>
                </div>
            </div>
        )
    }
}

function mapStateToProp(state){
    console.log(state.facebook)
    return({
        userName: state.root.userName,
    })
}
function mapDispatchToProp(dispatch){
    return({
        changeUserName: ()=>{dispatch(changeUserName())},
    })
}

export default connect(mapStateToProp,mapDispatchToProp)(Home);

