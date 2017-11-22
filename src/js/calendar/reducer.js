/**
 * Created by YouHan on 2017/11/20.
 */

import actionType from "./actionType";
import {combineReducers} from "redux";
import {userActionType} from '../user';

const initState = [];

const events = (state = initState, action) => {
  switch (action.type) {
    case actionType.load_event: {
      return action.events;
    }
    case userActionType.logout: {
      return initState;
    }
    default: {
      return state;
    }
  }
};


export default combineReducers({
  events
});
