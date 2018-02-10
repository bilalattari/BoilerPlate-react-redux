import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    isLoggedIn : false ,
    loginData : '',
    loginError : ''
}
export default function isLoggedReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case ActionTypes.IS_LOGGED:
         return {
            ...state , 
            isLoggedIn : action.isLoggedIn 
        }
        case ActionTypes.LOGIN_DATA:
        return {
            ...state , 
            loginData : action.loginData     
        }
       case ActionTypes.LOGIN_ERROR:
                return {
            ...state , 
             loginError : action.loginError 
                }
        default:
            return state;
    }
}

