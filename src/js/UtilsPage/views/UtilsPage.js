import React, {PureComponent} from 'react';
import {Card} from 'antd';
import styles from './UtilsPage.css';
import {Link} from "react-router-dom";

const tools = [
  [
    {key: 1, name: 'WEBSITE LOCATIONS', url: 'locations'},
    {key: 2, name: 'QRCODE GENERATOR', url: 'qrcode'},
    {key: 3, name: 'QRCODE GENERATOR', url: 'qrcode'},
  ],
  [
    {key: 4, name: 'WEBSITE LOCATION', url: 'locations'},
    {key: 5, name: 'QRCODE GENERATOR', url: 'qrcode'},
    {key: 6, name: 'QRCODE GENERATOR', url: 'qrcode'},
  ]
];


export default class UtilsPage extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {};
  }
  
  render() {
    return (
      <div className={styles.root}>
        {tools.map((toolItem, index) => {
          return (
            <div className={styles.row} key={index}>
              {toolItem.map((item) => {
                return (
                  <Card style={{width: 200}} key={item.key}>
                    <Link to={`${this.props.match.url}/${item.url}`}>
                      <div className={styles.card}>
                        <span style={{color: 'black', fontSize: 16, textAlign: 'center'}}>
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  </Card>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

