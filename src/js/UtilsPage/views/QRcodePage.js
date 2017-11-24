import React, {PureComponent} from 'react';
import {Input, Select, Slider} from 'antd';
import QRCode from 'qrcode.react';
import styles from './QRcodePage.css';

const {TextArea} = Input;
const Option = Select.Option;

export default class QRcodePage extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      content: '',
      bgColor: '#FFFFFF',
      fgColor: '#000000',
      level: 'L',
      size: 128
    };
    
    this.change = this.change.bind(this);
  }
  
  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  render() {
    return (
      <div className={styles.root}>
        <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}>
          <div className={styles.item}>
            <TextArea
              style={{width: 400}}
              rows={5}
              value={this.state.content}
              onChange={this.change}
              name={'content'}
              placeholder={'CONTENT'}
            />
            <Slider
              className={styles.input}
              placeholder={'SIZE'}
              onChange={(size) => {
                this.setState({
                  size
                });
              }}
              value={this.state.size}
              min={128}
              max={500}
            />
            <Select
              className={styles.input}
              defaultValue="L"
              style={{width: 400}}
              value={this.state.level}
              onChange={(level) => {
                this.setState({
                  level
                });
              }}
            >
              <Option value="L">L</Option>
              <Option value="M">M</Option>
              <Option value="Q">Q</Option>
              <Option value="H">H</Option>
            </Select>
          </div>
          <div className={styles.item}>
            <QRCode
              value={this.state.content}
              size={this.state.size}
              bgColor={this.state.bgColor}
              fgColor={this.state.fgColor}
              level={this.state.level}
            />,
          </div>
        </div>
      </div>
    );
  }
}