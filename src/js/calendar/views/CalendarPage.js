/**
 * Created by YouHan on 2017/11/20.
 */
import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import {Button, DatePicker, Input} from "antd";
import styles from './CalendarPage.css';

import './../../helpers/dataBaseHelper';
import TagSelect from "../comps/TagSelect";
import {connect} from "react-redux";
import {loadEvents, updateEvent} from "../action";

const {RangePicker} = DatePicker;
const {TextArea} = Input;

class CalendarPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      change: [],
      currentEvent: null,
    };

    this.change = this.change.bind(this);
    this.rangeChange = this.rangeChange.bind(this);
    this.tagChange = this.tagChange.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.selectSlot = this.selectSlot.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.renderRight = this.renderRight.bind(this);
  }

  componentDidMount() {
    this.props.loadEvents();
  }

  selectSlot(slotInfo) {
    console.log(slotInfo)
    this.setState({
      currentEvent: null
    });
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
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
    const {title, desc, tags, rang} = event;
    this.setState({
      currentEvent: event,
      title,
      desc,
      tags,
      rang
    });
  }

  updateEvent() {
    const {title, range, desc, tags, currentEvent} = this.state;
    this.props.updateEvent({
      title, desc, tags, range,
      key: currentEvent ? currentEvent.key : null
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
            events={events}
            onSelectEvent={this.selectEvent}
            onSelectSlot={this.selectSlot}
            eventPropGetter={(event, start, end, isSelected) => {
              return {style: isSelected ? {backgroundColor: 'green'} : null}
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
  updateEvent
})(CalendarPage);
