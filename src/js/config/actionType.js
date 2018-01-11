/**
 * Created by YouHan on 2017/11/20.
 */
const prefix = 'config_';

export const actionTypes = {
  load: `${prefix}load`,
  load_start: `${prefix}load_start`,
  update: `${prefix}update`,
  update_start: `${prefix}update_start`,
  load_alert: `${prefix}load_alert`,
  load_alert_start: `${prefix}load_alert_start`,
  update_alert: `${prefix}update_alert`,
  update_alert_start: `${prefix}update_alert_start`,
};

export default actionTypes;
