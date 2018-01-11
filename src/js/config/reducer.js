/**
 * Created by YouHan on 2017/11/20.
 */

import actionType from "./actionType";
import {combineReducers} from "redux";

const initState = {};

const tags = (state = initState, action) => {
  switch (action.type) {
    case actionType.load: {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

const alerts = (state = {}, action) => {
  switch (action.type) {
    case actionType.load_alert: {
      return action.data;
    }
    default: {
      return state;
    }
  }
};


export default combineReducers({
  tags,
  alerts
});
