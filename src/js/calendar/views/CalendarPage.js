/**
 * Created by YouHan on 2017/11/20.
 */
import React, {PureComponent} from "react";
import BigCalendar from 'react-big-calendar';
import {Button, DatePicker, Input} from "antd";
import styles from './CalendarPage.css';

import './../../helpers/dataBaseHelper';
import TagSelect from "../comps/TagSelect";

const {RangePicker} = DatePicker;
const {TextArea} = Input;

const events = [
  {
    'title': 'All Day Event very long title',
    'allDay': true,
    'start': new Date(2017, 11, 0),
    'end': new Date(2017, 11, 1)
  },
  {
    'title': 'Long Event',
    'start': new Date(2017, 11, 7),
    'end': new Date(2017, 11, 10)
  },
  
  {
    'title': 'DTS STARTS',
    'start': new Date(2017, 2, 13, 0, 0, 0),
    'end': new Date(2017, 2, 20, 0, 0, 0)
  },
  
  {
    'title': 'DTS ENDS',
    'start': new Date(2017, 10, 6, 0, 0, 0),
    'end': new Date(2017, 10, 13, 0, 0, 0)
  },
  
  {
    'title': 'Some Event',
    'start': new Date(2017, 11, 9, 0, 0, 0),
    'end': new Date(2017, 11, 9, 0, 0, 0)
  },
  {
    'title': 'Conference',
    'start': new Date(2017, 11, 11),
    'end': new Date(2017, 11, 13),
    desc: 'Big conference for important people'
  },
  {
    'title': 'Meeting',
    'start': new Date(2017, 11, 12, 10, 30, 0, 0),
    'end': new Date(2017, 11, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    'title': 'Lunch',
    'start': new Date(2017, 11, 12, 12, 0, 0, 0),
    'end': new Date(2017, 11, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    'title': 'Meeting',
    'start': new Date(2017, 11, 12, 14, 0, 0, 0),
    'end': new Date(2017, 11, 12, 15, 0, 0, 0)
  },
  {
    'title': 'Happy Hour',
    'start': new Date(2017, 11, 12, 17, 0, 0, 0),
    'end': new Date(2017, 11, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day'
  },
  {
    'title': 'Dinner',
    'start': new Date(2017, 11, 12, 20, 0, 0, 0),
    'end': new Date(2017, 11, 12, 21, 0, 0, 0)
  },
  {
    'title': 'Birthday Party',
    'start': new Date(2017, 11, 13, 7, 0, 0),
    'end': new Date(2017, 11, 13, 10, 30, 0)
  },
  {
    'title': 'Birthday Party 2',
    'start': new Date(2017, 11, 13, 7, 0, 0),
    'end': new Date(2017, 11, 13, 10, 30, 0)
  },
  {
    'title': 'Birthday Party 11',
    'start': new Date(2017, 11, 13, 7, 0, 0),
    'end': new Date(2017, 11, 13, 10, 30, 0)
  },
  {
    'title': 'Late Night Event',
    'start': new Date(2017, 11, 17, 19, 30, 0),
    'end': new Date(2017, 11, 18, 2, 0, 0)
  },
  {
    'title': 'Multi-day Event',
    'start': new Date(2017, 11, 20, 19, 30, 0),
    'end': new Date(2017, 11, 22, 2, 0, 0)
  }
];

class CalendarPage extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      change: [],
      currentEvent: null
    };
    
    this.change = this.change.bind(this);
    this.rangeChange = this.rangeChange.bind(this);
    this.tagChange = this.tagChange.bind(this);
  }
  
  selectSlot(slotInfo) {
    console.log(slotInfo)
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
  
  tagChange(value){
    this.setState({
      tags: value
    });
  }
  
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <BigCalendar
            style={{backgroundColor: 'white'}}
            selectable
            events={events}
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={this.selectSlot}
            eventPropGetter={(event, start, end, isSelected) => {
              return {style: isSelected ? {backgroundColor: 'green'} : null}
            }}
          />
        </div>
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
            type={'primary'}
            className={styles.button}
          >
            {this.state.currentEvent ? 'UPDATE' : 'NEW'} EVENT
          </Button>
        </div>
      
      </div>
    
    );
  }
}

export default CalendarPage;
