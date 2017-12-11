import actionType from "./actionType";

export const load = () => {
  return {
    type: actionType.load_start
  };
};

export const update = (data, after) => {
  return {
    type: actionType.update_start,
    data,
    after
  }
};

export const init = (after) => {
  return {
    type: actionType.init_start,
    after
  }
};

export const remove = (key) => {
  return {
    type: actionType.remove_start,
    key
  }
};
