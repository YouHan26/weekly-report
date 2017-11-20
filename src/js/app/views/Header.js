/**
 * Created by YouHan on 2017/11/20.
 */
import React, {PureComponent} from "react";
import {Button, Dropdown, Icon, Menu} from "antd";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import styles from "./Header.css";


class Header extends PureComponent {
  constructor(props) {
    super(props);
  }
  
  
  render() {
    const {user} = this.props;
    const {login, userInfo} = user;
    
    const logoutMenu = (
      <Menu>
        <Menu.Item>
          <span>登出</span>
        </Menu.Item>
      </Menu>
    );
    
    const loginMenu = (
      <Menu>
        <Menu.Item>
          <div>登陆</div>
        </Menu.Item>
      </Menu>
    );
    
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <span style={{fontSize: '18px'}}>Weekly Report</span>
          {login ?
            <Dropdown overlay={logoutMenu}>
              <Button className={styles.user}>
                <Icon type="user" />
                {userInfo.email}
              </Button>
            </Dropdown> :
            <Dropdown overlay={loginMenu}>
              <Button className={styles.user}>
                <Icon type="user" />
                未登录
              </Button>
            </Dropdown>
          }
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.bool.isRequired,
    showModal: PropTypes.bool.isRequired,
    userInfo: PropTypes.shape({
      email: PropTypes.string
    })
  })
};

Header.defaultProps = {
  userInfo: {}
};

export default connect((state) => {
  return {
    user: state.user
  };
}, {})(Header);
