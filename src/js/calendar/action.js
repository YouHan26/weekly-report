import actionType from "./actionType";

export const loadEvents = () => {
  return {
    type: actionType.load_event_start
  };
};

export const updateEvent = ({title = '', desc = '', tags = [], range = [], key, notice = false, common = false}, after) => {
  return {
    type: actionType.update_event_start,
    event: {
      title, desc, tags, key, notice, common,
      range: range.length === 2 ? [
        range[0].toDate().getTime(),
        range[1].toDate().getTime()
      ] : []
    },
    after
  };
};

export const removeEvent = (eventKey) => {
  return {
    type: actionType.remove_event_start,
    eventKey
  };
};

