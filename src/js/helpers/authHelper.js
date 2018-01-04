/**
 * Created by YouHan on 2017/11/20.
 */

import firebase from "firebase";

const init = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyAMUAmALO5dS70XAQYX5uf9rerx4fa3gto",
    authDomain: "weekly-report-d2fcc.firebaseapp.com",
    databaseURL: "https://weekly-report-d2fcc.firebaseio.com",
    projectId: "weekly-report-d2fcc",
    storageBucket: "weekly-report-d2fcc.appspot.com",
    messagingSenderId: "701357902566"
  });
};

init();

const auth = firebase.auth();

const USER_KEY = '@report:USER_KEY';

export default {
  init,
  login: (email, password) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return auth.currentUser;
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
  },
  hasAuth: () => {
    return !!auth.currentUser;
  },
  logout_start: () => {
    return auth.signOut();
  },
  syncAuth: () => {
    return auth.currentUser;
  },
  getAuthInstance: () => {
    return auth;
  },
  getUid: () => {
    return auth.currentUser ? auth.currentUser.uid : 'anonymous'
  },
  persistUser: (data) => {
    localStorage.setItem(USER_KEY, JSON.stringify(data))
  },
  recoverUser: () => {
    const str = localStorage.getItem(USER_KEY);
    if (str) {
      const {email, password} = JSON.parse(str) || {};
      if (email && password) {
        return {email, password};
      }
    }
    return {};
  }
};