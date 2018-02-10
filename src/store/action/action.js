
import ActionTypes from '../constant/constant';
import history from '../../History';
import firebase from 'firebase';


 

export function changeUserName() {
    return dispatch => {
        dispatch({ type: ActionTypes.USERNAME, payload: 'Ali' })
    }
}


export function signupAction(user) {

    return dispatch => {
        console.log('user', user);

        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((createdUser) => {
                console.log('signed up successfully', createdUser.uid);
                delete user.password;
                user.uid = createdUser.uid;
                firebase.database().ref('users/' + createdUser.uid + '/').set(user)
                    .then(() => {
                        firebase.database().ref('users/').once('value')
                            .then((userData) => {
                                let allUsers = userData.val();
                                let currentUserInf = {
                                 id: firebase.auth().currentUser.uid ,
                                 name : user.username  
                                }
                                console.log(currentUserInf)
                                dispatch({ type: ActionTypes.ALLUSERS, payload: allUsers })
                                dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserInf })

                                        history.push('/signin');
                                    })

                            })
                    })


        



    }
}



export function signinAction(user) {
    return dispatch => {
        console.log('user in signin', user);
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((signedinUser) => {
                firebase.database().ref('users/').once('value')
                    .then((userData) => {
                        let allUsers = userData.val();
                        let currentUserUid = firebase.auth().currentUser.uid;
                        let allUsersArr = [];
                        for(var key in allUsers){
                            allUsersArr.push(allUsers[key]);
                        }
                        console.log(allUsersArr);
                        dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersArr })
                        dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserUid})
                        // firebase.database().ref('message/').once('value')
                        //             .then((messagesData) => {
                        //                 let messages = messagesData.val();
                        //                 let allMsgsArr = [];
                        //                 for(var key in messages){
                        //                 allMsgsArr.push(messages[key]);
                        //                 }
                        //                 console.log(allMsgsArr);
                                        // dispatch({ type: ActionTypes.MESSAGES, payload: allMsgsArr })
                                        // history.push('/chat');
                                    // })

                            })
                    })


            }}





// export function changeRecipientUID(recpUID) {
//     console.log(recpUID)
//     return dispatch => {
//         dispatch({type: ActionTypes.CHANGERECPUID, payload:recpUID})
//     }
// }


// export function getBckToInbox() {
//     return dispatch => {
//         dispatch({type: ActionTypes.GET_BACK_TO_INBOX })
//     }
// }
  
// let allMrssagesArr = [];
// export function sendMessage(message) {
//     return dispatch => {
//         firebase.database().ref('message/').push(message)
//             .then(()=>{
//                 console.log('message sent')
//                 firebase.database().ref('message/').on('child_added' , messagesData => {
//                             let messages = messagesData.val();
//                             messages.id = messagesData.key
//                             allMrssagesArr.push(messages);
//                             dispatch({ type: ActionTypes.MESSAGES, payload: allMrssagesArr })
//                 }) 

//         })

//     }
// }
//     export function delMessage (ALLmsgs , index){
//     console.log(ALLmsgs , 'dsjkgdha',index)
//      ALLmsgs.splice(index , 1)
//     console.log(ALLmsgs , 'afterDel')
//       return dispatch =>
//      firebase.database().ref().child('message/').set(ALLmsgs)
//       .then(() => {
//                 console.log('success')
//                 firebase.database().ref().child('message/').once('value')
//                 .then((msg) => {
//                 let allMsg = msg.val();
//                 console.log(allMsg , 'allTodosFromFirebaseAfterDel')
//                  dispatch({
//                     type: ActionTypes.DELETE_TODO, 
//                     payload: allMsg 
//                 })
//                 })
//       })
// }
//     export function editMessage (ALLmsgs ,  index , newTodo){
//     console.log(ALLmsgs , index , newTodo , 'edit')
//     // ALLmsgs.splice(index , 1 , newTodo)
//       ALLmsgs[index].message = newTodo 
//     console.log(ALLmsgs , 'afterEdedit')
//       return dispatch =>
//      firebase.database().ref().child('message/').set(ALLmsgs)
//       .then(() => {
//                 console.log('success')
//                 firebase.database().ref().child('message/').once('value')
//                 .then((msg) => {
//                 let allMsg = msg.val();
//                  dispatch({
//                     type: ActionTypes.EDIT_TODO, 
//                     payload: allMsg 
//                 })
//                 })
//       })
// }