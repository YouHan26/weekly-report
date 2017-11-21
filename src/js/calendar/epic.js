/**
 * Created by YouHan on 2017/11/20.
 */
import {Observable} from "rxjs";
import {combineEpics} from "redux-observable";
import actionType from "./actionType";

const loadEventsEpic = (action$) => {
  return action$.ofType(actionType.load_event_start)
    .map((action) => {
      return {
        ...action,
        type: 'xxxxx'
      };
    })
};


export default combineEpics(
  loadEventsEpic,
);


