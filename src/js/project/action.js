import actionType from "./actionType";

export const loadProject = () => {
  return {
    type: actionType.load_start
  };
};

export const updateProject = (project) => {
  return {
    type: actionType.update_start,
    project
  };
};

export const removeProject = (projectKey) => {
  return {
    type: actionType.remove_start,
    projectKey
  };
};