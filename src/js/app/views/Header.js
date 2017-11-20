/**
 * Created by YouHan on 2017/11/20.
 */
import React, {PureComponent} from "react";
import styles from "./Header.css";
import {Button, Dropdown, Icon, Menu} from "antd";


class Header extends PureComponent {
  constructor(props) {
    super(props);
  }
  
  
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
        </Menu.Item>
      </Menu>
    );
    
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <span>Weekly Report</span>
          <Dropdown overlay={menu}>
            <Button>bottomLeft</Button>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default Header;
