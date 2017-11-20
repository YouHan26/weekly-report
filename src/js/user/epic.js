/**
 * Created by YouHan on 2017/11/20.
 */
// import {Observable} from "rxjs";
import {combineEpics} from "redux-observable";
import firebase from "firebase";

const loginInitEpic = (action$) => {
  return action$.ofType('xx')
};

export default combineEpics(
  loginInitEpic
);



firebase.initializeApp({
  apiKey: "AIzaSyAMUAmALO5dS70XAQYX5uf9rerx4fa3gto",
  authDomain: "weekly-report-d2fcc.firebaseapp.com",
  databaseURL: "https://weekly-report-d2fcc.firebaseio.com",
  projectId: "weekly-report-d2fcc",
  storageBucket: "weekly-report-d2fcc.appspot.com",
  messagingSenderId: "701357902566"
});

const auth = firebase.auth();
console.log(auth.currentUser);

if(!auth.currentUser){
  firebase.auth()
    .signInWithEmailAndPassword('youhan26@gmail.com', '410225')
    .then((res) => {
      console.log(auth.currentUser.email);
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}