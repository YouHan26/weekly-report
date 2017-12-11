/**
 * Created by YouHan on 2017/11/20.
 */
import {Observable} from "rxjs";
import {combineEpics} from "redux-observable";
import actionType from "./actionType";
import {mindMapHelper} from '../helpers/dataBaseHelper';
import authHelper from "../helpers/authHelper";
import {load} from "./action";

const loadEpic = (action$) => {
  return action$.ofType(actionType.load_start)
    .mergeMap(() => {
      return Observable.fromPromise(mindMapHelper.load())
        .map((events) => {
          const data = {};
          if (events) {
            Object.keys(events).map((key) => {
              const item = events[key];
              if (item.uid === authHelper.getUid()) {
                data[key] = item;
              }
            });
          }

          return {
            type: actionType.load,
            data
          };
        });
    });
};

const updateEpic = (action$) => {
  return action$.ofType(actionType.update_start)
    .mergeMap((action) => {
      const {data} = action;
      return Observable.fromPromise(data.uid ? mindMapHelper.update(data) : mindMapHelper.add(data))
        .map(({key}) => {
          action.after && action.after(key);
          return load();
        });
    })
};


export default combineEpics(
  loadEpic,
  updateEpic
);


