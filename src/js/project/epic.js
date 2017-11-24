/**
 * Created by YouHan on 2017/11/20.
 */
import {Observable} from "rxjs";
import {combineEpics} from "redux-observable";
import actionType from "./actionType";
import {projectHelper} from '../helpers/dataBaseHelper';

const loadEpic = (action$) => {
  return action$
    .filter((action) => {
      return action.type === actionType.load_start;
    })
    .mergeMap(() => {
      return new Observable.fromPromise(projectHelper.load())
        .map((projects) => {
          return {
            type: actionType.load,
            projects: Object.values(projects)
          };
        });
    });
};

const updateEpic = (action$) => {
  return action$.ofType(actionType.update_start)
    .mergeMap((action) => {
      return new Observable.fromPromise(projectHelper.add(action.project))
        .map(() => {
          return {
            type: actionType.load_start
          };
        })
    });
};


export default combineEpics(
  loadEpic,
  updateEpic,
);


