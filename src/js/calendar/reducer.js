/**
 * Created by YouHan on 2017/11/20.
 */

import actionType from "./actionType";
import {combineReducers} from "redux";

const initState = [];

const events = (state = initState, action) => {
  switch (action.type) {
    case actionType.load_event: {
      return action.events;
    }
    default: {
      return state;
    }
  }
};


export default combineReducers({
  events
});
