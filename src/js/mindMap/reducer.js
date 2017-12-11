/**
 * Created by YouHan on 2017/11/20.
 */

import actionType from "./actionType";

const initState = {};

const mindMap = (state = initState, action) => {
  switch (action.type) {
    case actionType.load: {
      return action.data;
    }
    default: {
      return state;
    }
  }
};


export default mindMap;