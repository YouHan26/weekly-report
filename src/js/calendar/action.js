import actionType from "./actionType";

export const loadEvents = () => {
  return {
    type: actionType.load_event_start
  };
};

export const updateEvent = (events) => {
  return {
    type: actionType.update_event_start,
    events
  };
};

