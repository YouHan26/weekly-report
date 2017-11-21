/**
 * Created by YouHan on 2017/11/20.
 */
import {Observable} from "rxjs";
import {combineEpics} from "redux-observable";
import actionType from "./actionType";
import authHelper from "../helpers/authHelper";

const logoutEpic = (action$) => {
  return action$.ofType(actionType.logout_start)
    .mergeMap(() => {
      return new Observable.of({
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
      return new Observable.of(authHelper.syncAuth())
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
      return new Observable.fromPromise(authHelper.login(action.email, action.password))
        .map((userInfo) => {
          return {
            action,
            userInfo
          }
        });
    })
    .map(({userInfo}) => {
      return {
        userInfo,
        type: actionType.login
      }
    })
};

export default combineEpics(
  logoutEpic,
  loginEpic,
  syncUserEpic
);


