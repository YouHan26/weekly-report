import React, {PureComponent} from 'react';
import {Timeline} from "antd";
import styles from './ChangeLog.css';
import autobind from 'autobind-decorator';

@autobind
export default class ChangeLog extends PureComponent {
  constructor(props) {
    super(props);
  
    this.state = {};
  }
  
  render() {
    return (
      <div className={styles.root}>
        <Timeline>
          <Timeline.Item color="green">
            2017-11-20 Init Project
          </Timeline.Item>
          <Timeline.Item color="green">
            2017-11-21 Version 1.0.0
          </Timeline.Item>
          <Timeline.Item color="green">
            2017-11-23 Support Notification
          </Timeline.Item>
          <Timeline.Item color="green">
            2017-11-24 Support Public Event
          </Timeline.Item>
          <Timeline.Item color="green">
            2017-11-24 Support Change Log
          </Timeline.Item>
          <Timeline.Item color="green">
            2017-11-24 Add QR code generator
          </Timeline.Item>
          <Timeline.Item color="green">
            2017-11-24 Add URL Collection
          </Timeline.Item>
          <Timeline.Item color="green">
            2017-11-25 Only Owner of Public Event Can Update
          </Timeline.Item>
          <Timeline.Item color="green">
            2017-11-25 Add Desc To Agenda
          </Timeline.Item>
          <Timeline.Item color="green">
            2017-11-27 Support Drog And Drop
          </Timeline.Item>
          <Timeline.Item color="green">
            2017-11-28 Support Tomato Time
          </Timeline.Item>
          <Timeline.Item color="green">
            2017-12-17 Support Heat Map
          </Timeline.Item>
          <Timeline.Item color="green">
            2017-12-20 Support Custom Tags
          </Timeline.Item>
        </Timeline>
      </div>
    );
  }
}
