import actionType from "./actionType";

export const loadTag = () => {
  return {
    type: actionType.load_start
  };
};

export const updateTag = (data, after) => {
  return {
    type: actionType.update_start,
    data,
    after
  };
};

export const loadAlert = () => {
  return {
    type: actionType.load_alert_start
  };
};

export const updateAlert = (data) => {
  return {
    type: actionType.update_alert_start,
    data
  };
};
