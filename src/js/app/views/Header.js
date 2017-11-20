/**
 * Created by YouHan on 2017/11/20.
 */
import React, {PureComponent} from "react";
import {Button, Dropdown, Icon, Menu} from "antd";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {userAction} from '../../user';
import styles from "./Header.css";

const {showLoginModal, logout_start} = userAction;


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
          <div onClick={this.props.logout}>登出</div>
        </Menu.Item>
      </Menu>
    );
    
    const loginMenu = (
      <Menu>
        <Menu.Item>
          <div onClick={this.props.showLoginModal}>登陆</div>
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
  }),
  showLoginModal: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  userInfo: {}
};

export default connect((state) => {
  return {
    user: state.user
  };
}, {
  showLoginModal,
  logout_start
})(Header);
