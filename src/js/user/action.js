/**
 * Created by YouHan on 2017/11/20.
 */
import actionType from "./actionType";

export const logout = () => {
  return {
    type: actionType.logout_start
  };
};


export const login = (email, password) => {
  return {
    type: actionType.login,
    email,
    password
  };
};

export const showLoginModal = () => {
  return {
    type: actionType.show_modal
  };
};
