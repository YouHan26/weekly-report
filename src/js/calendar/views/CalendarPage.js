/**
 * Created by YouHan on 2017/11/20.
 */
import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from "moment";
import autobind from 'autobind-decorator';
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'
import {Button, Checkbox, DatePicker, Input} from "antd";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import styles from './CalendarPage.css';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';
import './../../helpers/dataBaseHelper';
import TagSelect from "../comps/TagSelect";
import {connect} from "react-redux";
import {loadEvents, removeEvent, updateEvent} from "../action";
import types from "../../helpers/types";
import UserSelect from "../comps/UserSelect";

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

const {RangePicker} = DatePicker;
const {TextArea} = Input;

function EventAgenda({event}) {
  return <span>
    <strong>{event.title}</strong>
    <p>{event.desc}</p>
  </span>
}


const initState = {
  range: [moment(), moment()],
  title: '',
  desc: '',
  tags: [],
  notice: false,
  common: false,
  commonUser: [],
};

class CalendarPage extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      ...initState,
      currentEvent: null,
    };
  }
  
  componentDidMount() {
    // this.props.loadEvents();
  }
  
  @autobind
  moveEvent({event, start, end}) {
    const {range, ...newEvent} = event;
    
    const move = start.getTime() - range[0].toDate().getTime();
    newEvent.range = [
      moment(range[0].toDate().getTime() + move),
      moment(range[1].toDate().getTime() + move)
    ];
    delete newEvent.start;
    delete newEvent.end;
    
    this.props.updateEvent(newEvent);
  }
  
  @autobind
  selectSlot(slotInfo) {
    this.setState({
      currentEvent: null,
      ...initState,
      range: [moment(slotInfo.start), moment(slotInfo.end)]
    });
  }
  
  @autobind
  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  @autobind
  checkChange(e) {
    this.setState({
      [e.target.name]: e.target.checked
    });
  }
  
  @autobind
  userSelectChange(commonUser) {
    this.setState({
      commonUser
    });
  }
  
  @autobind
  rangeChange(range) {
    this.setState({
      range
    });
  }
  
  @autobind
  tagChange(value) {
    this.setState({
      tags: value
    });
  }
  
  @autobind
  selectEvent(event) {
    const {title, desc, tags, range, notice = false, common = false, commonUser = []} = event;
    this.setState({
      currentEvent: event,
      title,
      desc,
      tags,
      notice,
      common,
      commonUser,
      range: [moment(range[0]), moment(range[1])]
    });
  }
  
  @autobind
  updateEvent() {
    const {title, range, desc, tags, notice, common, commonUser, currentEvent} = this.state;
    
    this.props.updateEvent({
      title, desc, tags, range, notice, common, commonUser,
      key: currentEvent ? currentEvent.key : null
    }, () => {
      this.setState({
        currentEvent: null,
        ...initState
      });
    });
  }
  
  @autobind
  removeEvent() {
    const {currentEvent} = this.state;
    this.props.removeEvent(currentEvent.key);
    this.setState({
      currentEvent: null,
      ...initState
    });
  }
  
  @autobind
  renderRight() {
    const {currentEvent} = this.state;
    const {user} = this.props;
    const {userInfo} = user;
    
    let allowEdit = false;
    
    if (currentEvent && (
        (currentEvent.uid === userInfo.uid)
      )) {
      allowEdit = true;
    }
    
    return (
      <div className={styles.right}>
        <Input
          placeholder={'EVENT TITLE'}
          value={this.state.title}
          name={'title'}
          onChange={this.change}
          className={styles.input}
        />
        <RangePicker
          showTime={{format: 'HH:mm'}}
          format={'YYYY-MM-DD HH:mm'}
          onChange={this.rangeChange}
          value={this.state.range}
          className={styles.input}
        />
        <TextArea
          placeholder={'EVENT DESC'}
          value={this.state.desc}
          rows={4}
          name={'desc'}
          onChange={this.change}
          className={styles.input}
        />
        <Checkbox
          className={styles.input}
          name={'notice'}
          onChange={this.checkChange}
          checked={this.state.notice}
        >
          Enable Notification
        </Checkbox>
        <div>
          <Checkbox
            className={styles.input}
            name={'common'}
            onChange={this.checkChange}
            checked={this.state.common}
          >
            Enable Public
          </Checkbox>
          {this.state.common ?
            <UserSelect
              onChange={this.userSelectChange}
              value={this.state.commonUser}
            /> : null
          }
        </div>
        <TagSelect
          dataSet={Object.values(this.props.tags)}
          value={this.state.tags}
          onChange={this.tagChange}
        />
        {allowEdit ?
          <Button
            onClick={this.updateEvent}
            type={'primary'}
            className={styles.button}
          >
            {currentEvent ? 'UPDATE' : 'NEW'} EVENT
          </Button> : null
        }
        {!currentEvent ?
          <Button
            onClick={this.updateEvent}
            type={'primary'}
            className={styles.button}
          >
            NEW EVENT
          </Button> : null
        }
        {allowEdit ?
          <Button
            onClick={this.removeEvent}
            type={'danger'}
            className={styles.button}
            style={{marginLeft: '6px'}}
          >
            Remove Event
          </Button>
          : null
        }
      </div>
    );
  }
  
  render() {
    const {events, tags} = this.props;
    
    const Event = ({event}) => {
      return (
        <div>
      <span>
        <strong>
        {event.tags
        && event.tags.length > 0
        && event.tags.map((eventTag) => {
          const tag = tags[eventTag] || {};
          const {name, color} = tag;
          return (
            <span key={eventTag} className={styles.tag}>
              【{name}】
            </span>
          );
        })}
        </strong>
      </span>
          <strong>
            {event.title}
          </strong>
        </div>
      );
    };
    
    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <DragAndDropCalendar
            style={{backgroundColor: 'white'}}
            selectable
            onEventDrop={this.moveEvent}
            events={events.map((event) => {
              const {range} = event;
              return {
                ...event,
                start: new Date(range[0]),
                end: new Date(range[1])
              }
            })}
            onSelectEvent={this.selectEvent}
            onSelectSlot={this.selectSlot}
            eventPropGetter={(event, start, end, isSelected) => {
              let backgroundColor = '#dda67a';
              
              if (isSelected) {
                backgroundColor = '#3174ad';
              }
              
              const eventTags = event.tags;
              if (eventTags && eventTags.length > 0) {
                const tag = tags[eventTags[0]];
                const {color} = tag || {};
                if (color) {
                  backgroundColor = color;
                }
              }
              return {
                style: {backgroundColor}
              };
            }}
            components={{
              event: Event,
              agenda: {
                event: EventAgenda
              }
            }}
          />
        </div>
        {this.renderRight()}
      </div>
    
    );
  }
}

CalendarPage.propTypes = {
  user: types.user,
  loadEvents: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  removeEvent: PropTypes.func.isRequired,
  events: PropTypes.array,
  tags: PropTypes.shape({})
};

CalendarPage.defaultProps = {
  events: [],
  tags: {}
};


export default connect((state) => {
  return {
    events: state.calendar.events,
    user: state.user,
    tags: state.config.tags
  };
}, {
  loadEvents,
  updateEvent,
  removeEvent
})(DragDropContext(HTML5Backend)(CalendarPage));
