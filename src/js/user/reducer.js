/**
 * Created by YouHan on 2017/11/20.
 */

import actionType from "./actionType";

const initState = {
  login: false,
  showModal: false,
  userInfo: {},
};

const state = (state = initState, action) => {
  switch (action.type) {
    case actionType.logout: {
      return {...initState};
    }
    case actionType.show_modal: {
      return {
        ...state,
        showModal: true
      };
    }
    case actionType.login: {
      return {
        ...state,
        showModal: false,
        login: true,
        userInfo: action.userInfo
      };
    }
    default: {
      return state;
    }
  }
};


export default state;
