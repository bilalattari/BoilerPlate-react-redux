import firebase from 'firebase';
import history from '../../History';
import ActionTypes from '../constant/constant';


export function isLoggedIn(isLoggedIn) {

    return {
        type:ActionTypes.IS_LOGGED,
        isLoggedIn
    }
}
export function loginData(loginData) {

    return {
        type: ActionTypes.LOGIN_DATA,
        loginData
    }
}
export function loginError(loginError) {

    return {
        type: ActionTypes.LOGIN_ERROR,
        loginError
    }
}
export function logIn() {

    return (dispatch) => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) { 
            var user = result.user;
            console.log("login successful");
                dispatch(isLoggedIn(true));
                console.log(user.photoURL);
                dispatch(loginData(user.photoURL));
               history.push('/chat');;
            
        }).catch(function (error) {

            dispatch(loginError(error));
        });
    }
}
export function logOut() {

    return (dispatch) => {
        firebase.auth().signOut().then(function () {
            console.log("Sign-out successful");
            dispatch(isLoggedIn(false));
            history.push('/');
        }).catch(function (error) {
            dispatch(loginError(error));
        });
    }
}