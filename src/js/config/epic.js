/**
 * Created by YouHan on 2017/11/20.
 */
import {Observable} from "rxjs";
import {combineEpics} from "redux-observable";
import actionType from "./actionType";
import {alertHelper, tagsHelper} from '../helpers/dataBaseHelper';
import authHelper from "../helpers/authHelper";
import {loadAlert, loadTag} from "./action";
import pushHelper from "../helpers/pushHelper";

const loadTagEpic = (action$) => {
  return action$
    .ofType(actionType.load_start)
    .mergeMap((action) => {
      return Observable.fromPromise(tagsHelper.load())
        .map((events) => {
          
          const data = {};
          if (events) {
            Object.keys(events).map((key) => {
              const item = events[key];
              if (item.uid === authHelper.getUid()) {
                data[item.key] = item;
              }
            });
          }
          return {
            ...action,
            type: actionType.load,
            data
          };
        });
    });
};

const updateTagEpic = (action$) => {
  return action$.ofType(actionType.update_start)
    .mergeMap((action) => {
      const {data} = action;
      const {uid} = data;
      
      return Observable.concat(
        Observable.fromPromise(uid ? tagsHelper.update(data) : tagsHelper.add(data))
          .map(({}) => {
            action.after && action.after();
            return loadTag();
          })
      );
    })
};


const loadAlertEpic = (action$) => {
  return action$
    .ofType(actionType.load_alert_start)
    .mergeMap((action) => {
      return Observable.fromPromise(alertHelper.load())
        .map((events) => {
          
          let data = {};
          if (events) {
            Object.keys(events).map((key) => {
              const item = events[key];
              if (item.uid === authHelper.getUid()) {
                data = item;
              }
            });
          }
          pushHelper.alertWater(data.water);
          
          return {
            ...action,
            type: actionType.load_alert,
            data
          };
        });
    });
};

const updateAlertEpic = (action$) => {
  return action$.ofType(actionType.update_alert_start)
    .mergeMap((action) => {
      const {data} = action;
      const {uid} = data;
      
      return Observable.concat(
        Observable.fromPromise(uid ? alertHelper.update(data) : alertHelper.add(data))
          .map(({}) => {
            action.after && action.after();
            return loadAlert();
          })
      );
    })
};


export default combineEpics(
  loadTagEpic,
  updateTagEpic,
  updateAlertEpic,
  loadAlertEpic,
);


