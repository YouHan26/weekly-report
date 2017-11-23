/**
 * Created by YouHan on 2017/11/20.
 */
import React, {PureComponent} from "react";
import {Button, Dropdown, Icon, Menu} from "antd";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {userAction} from '../../user';
import styles from "./Header.css";
import types from "../../helpers/types";
import authHelper from "../../helpers/authHelper";

const {showLoginModal, logout, syncAuth, login} = userAction;


class Header extends PureComponent {
  constructor(props) {
    super(props);
    
  }
  
  componentDidMount() {
    const userData = authHelper.recoverUser();
    this.props.login(userData.email, userData.password);
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
            <Button className={styles.user} onClick={this.props.showLoginModal}>
              <Icon type="user" />
              未登录
            </Button>
          }
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: types.user,
  showLoginModal: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  syncAuth: PropTypes.func.isRequired,
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
  logout,
  login,
  syncAuth
})(Header);
