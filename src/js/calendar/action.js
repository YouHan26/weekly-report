import actionType from "./actionType";

export const loadEvents = () => {
  return {
    type: actionType.load_event_start
  };
};

export const updateEvent = ({title = '', desc = '', tags = [], range = []}) => {
  return {
    type: actionType.update_event_start,
    event: {
      title, desc, tags,
      range: range.length === 2 ? [
        range[0].toDate().getTime(),
        range[1].toDate().getTime()
      ] : []
    }
  };
};

