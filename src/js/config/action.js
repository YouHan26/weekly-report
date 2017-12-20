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

