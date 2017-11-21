/**
 * Created by YouHan on 2017/11/20.
 */
const prefix = 'user_';

export const actionTypes = {
  sync_user: `${prefix}sync_user`,
  logout_start: `${prefix}logout_start`,
  show_modal: `${prefix}show_modal`,
  hide_modal: `${prefix}hide_modal`,
  logout: `${prefix}logout`,
  login_start: `${prefix}login_start`,
  login: `${prefix}login`,
};

export default actionTypes;
