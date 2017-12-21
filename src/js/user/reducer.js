/**
 * Created by YouHan on 2017/11/20.
 */

import actionType from "./actionType";

const initState = {
  login: false,
  showModal: false,
  userInfo: {},
  userList: {},
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
    case actionType.load_user_list: {
      return {
        ...state,
        userList: action.data
      };
    }
    default: {
      return state;
    }
  }
};


export default state;
