/**
 * Created by YouHan on 2017/11/20.
 */

import actionType from "./actionType";
import {combineReducers} from "redux";

const initState = [];

const events = (state = initState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};


export default combineReducers({
  events
});
