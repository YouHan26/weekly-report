/**
 * Created by YouHan on 2017/11/20.
 */
import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from "moment";
import {Button, Checkbox, DatePicker, Input} from "antd";
import styles from './CalendarPage.css';

import './../../helpers/dataBaseHelper';
import TagSelect from "../comps/TagSelect";
import {connect} from "react-redux";
import {loadEvents, removeEvent, updateEvent} from "../action";
import {tags} from '../../helpers/varibles';

const {RangePicker} = DatePicker;
const {TextArea} = Input;


const initState = {
  range: [moment(), moment()],
  title: '',
  desc: '',
  tags: [],
  notice: false,
  common: false
};

class CalendarPage extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      ...initState,
      currentEvent: null,
    };
    
    this.change = this.change.bind(this);
    this.rangeChange = this.rangeChange.bind(this);
    this.tagChange = this.tagChange.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.selectSlot = this.selectSlot.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.renderRight = this.renderRight.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.checkChange = this.checkChange.bind(this);
  }
  
  componentDidMount() {
    this.props.loadEvents();
    // Push.create("Hello world!", {
    //   body: "How's it hangin'?",
    //   icon: '/icon.png',
    //   timeout: 4000,
    //   onClick: function () {
    //     window.focus();
    //     this.close();
    //   }
    // });
  }
  
  selectSlot(slotInfo) {
    this.setState({
      currentEvent: null,
      ...initState,
      range: [moment(slotInfo.start), moment(slotInfo.end)]
    });
  }
  
  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  checkChange(e) {
    this.setState({
      [e.target.name]: e.target.checked
    });
  }
  
  rangeChange(range) {
    this.setState({
      range
    });
  }
  
  tagChange(value) {
    this.setState({
      tags: value
    });
  }
  
  selectEvent(event) {
    const {title, desc, tags, range, notice = false, common = false} = event;
    this.setState({
      currentEvent: event,
      title,
      desc,
      tags,
      notice,
      common,
      range: [moment(range[0]), moment(range[1])]
    });
  }
  
  updateEvent() {
    const {title, range, desc, tags, notice, common, currentEvent} = this.state;
    this.props.updateEvent({
      title, desc, tags, range, notice, common,
      key: currentEvent ? currentEvent.key : null
    }, () => {
      this.setState({
        currentEvent: null,
        ...initState
      });
    });
  }
  
  removeEvent() {
    const {currentEvent} = this.state;
    this.props.removeEvent(currentEvent.key);
    this.setState({
      currentEvent: null,
      ...initState
    });
  }
  
  renderRight() {
    const {currentEvent} = this.state;
    
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
          ENABLE NOTIFICATION
        </Checkbox>
        <div>
          <Checkbox
            className={styles.input}
            name={'common'}
            onChange={this.checkChange}
            checked={this.state.common}
          >
            ENABLE PUBLIC
          </Checkbox>
        </div>
        <TagSelect
          value={this.state.tags}
          onChange={this.tagChange}
        />
        <Button
          onClick={this.updateEvent}
          type={'primary'}
          className={styles.button}
        >
          {currentEvent ? 'UPDATE' : 'NEW'} EVENT
        </Button>
        {currentEvent ?
          <Button
            onClick={this.removeEvent}
            type={'danger'}
            className={styles.button}
            style={{marginLeft: '6px'}}
          >
            REMOVE EVENT
          </Button>
          : null
        }
      </div>
    );
  }
  
  render() {
    const {events} = this.props;
    
    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <BigCalendar
            style={{backgroundColor: 'white'}}
            selectable
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
                backgroundColor = tags.find((tag) => {
                  return tag.key === eventTags[0];
                }).color;
              }
              return {
                style: {backgroundColor}
              };
            }}
          />
        </div>
        {this.renderRight()}
      </div>
    
    );
  }
}

CalendarPage.propTypes = {
  loadEvents: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  removeEvent: PropTypes.func.isRequired,
  events: PropTypes.array,
};

CalendarPage.defaultProps = {
  events: []
};


export default connect((state) => {
  return {
    events: state.calendar.events
  };
}, {
  loadEvents,
  updateEvent,
  removeEvent
})(CalendarPage);
