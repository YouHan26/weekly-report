/**
 * Created by YouHan on 2017/11/20.
 */
import {Observable} from "rxjs";
import {combineEpics} from "redux-observable";
import actionType from "./actionType";
import authHelper from "../helpers/authHelper";
import {loadTag} from "../config/action";
import {loadEvents} from "../calendar/action";
import {userHelper} from "../helpers/dataBaseHelper";
import {loadUserList} from "./action";

const logoutEpic = (action$) => {
  return action$.ofType(actionType.logout_start)
    .mergeMap(() => {
      return Observable.of({
        type: actionType.logout
      });
    })
    .do(() => {
      authHelper.logout_start();
    });
};

const syncUserEpic = (action$) => {
  return action$.ofType(actionType.sync_user)
    .mergeMap((action) => {
      return Observable.of(authHelper.syncAuth())
        .filter((data) => {
          return !!data;
        })
        .map((data) => {
          return {
            ...action,
            type: actionType.login,
            userInfo: data
          };
        })
    })
};

const loginEpic = (action$) => {
  return action$.ofType(actionType.login_start)
    .mergeMap((action) => {
      return Observable.concat(
        Observable.fromPromise(authHelper.login(action.email, action.password))
          .map((userInfo) => {
            return {
              action,
              userInfo
            }
          })
          .do(({action}) => {
            const {email, password} = action;
            authHelper.persistUser({email, password});
          })
          .map(({userInfo}) => {
            return {
              userInfo,
              type: actionType.login
            }
          }),
        Observable.of(loadTag()),
        Observable.of(loadEvents())
      );
    });
};

const uploadUserEpic = (action$) => {
  return action$.ofType(actionType.login)
    .mergeMap((action) => {
      const {userInfo} = action;
      
      const {uid, email} = userInfo;
      
      return Observable.fromPromise(
        userHelper.ref.child(uid).set({
          uid,
          name: email.replace('@gmail.com', '')
        })
      )
        .map(() => {
          return loadUserList();
        });
    });
};

const loadUserListEpic = (action$) => {
  return action$.ofType(actionType.load_user_list_start)
    .mergeMap(() => {
      return Observable.fromPromise(userHelper.load())
        .map((events) => {
          return {
            type: actionType.load_user_list,
            data: events || {}
          }
        });
    });
};


export default combineEpics(
  logoutEpic,
  loginEpic,
  syncUserEpic,
  uploadUserEpic,
  loadUserListEpic
);


