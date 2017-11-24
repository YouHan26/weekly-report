/**
 * Created by YouHan on 2017/11/20.
 */

import actionType from "./actionType";

const initState = [];

const projects = (state = initState, action) => {
  switch (action.type) {
    case actionType.load: {
      return action.projects;
    }
    default: {
      return state;
    }
  }
};


export default projects;
