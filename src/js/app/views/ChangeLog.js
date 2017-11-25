import React, {PureComponent} from 'react';
import {Row, Timeline} from "antd";
import styles from './ChangeLog.css';


export default class ChangeLog extends PureComponent {
  constructor(props) {
    super(props);
    
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
          <Timeline.Item>
            Support Custom Tags
          </Timeline.Item>
        </Timeline>
      </div>
    );
  }
}
