/**
 * Created by YouHan on 2017/11/20.
 */
import {Observable} from "rxjs";
import {combineEpics} from "redux-observable";
import actionType from "./actionType";
import {eventHelper} from '../helpers/dataBaseHelper';
import {loadEvents} from "./action";
import moment from "moment";

const loadEventsEpic = (action$) => {
  return action$.ofType(actionType.load_event_start)
    .mergeMap((action) => {
      return new Observable.fromPromise(eventHelper.load())
        .map((events) => {
          return {
            ...action,
            type: actionType.load_event,
            events: Object.values(events || {}).map((event) => {
              const {range} = event;
              return {
                ...event,
                range: range.length === 2 ?
                  [moment(range[0]), moment(range[1])]
                  : []
              };
            })
          };
        });
    });
};

const updateEventEpic = (action$) => {
  return action$.ofType(actionType.update_event_start)
    .mergeMap((action) => {
      const event = action.event;
      return new Observable.fromPromise(
        event.key ? eventHelper.update(event)
          : eventHelper.add(event)
      )
        .map(() => {
          return action;
        })
    })
    .do((action) => {
      action.after && action.after();
    })
    .map(() => {
      return loadEvents();
    })
};

const removeEventEpic = (action$) => {
  return action$.ofType(actionType.remove_event_start)
    .mergeMap((action) => {
      return new Observable.fromPromise(eventHelper.remove(action.eventKey))
        .map(() => {
          return action;
        })
    })
    .do((action) => {
      action.after && action.after();
    })
    .map(() => {
      return loadEvents();
    });
};


export default combineEpics(
  loadEventsEpic,
  updateEventEpic,
  removeEventEpic
);


